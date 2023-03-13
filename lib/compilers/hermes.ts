// Copyright (c) 2019, Sebastian Rath
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright notice,
//       this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

import type {AsmResultSource, ParsedAsmResultLine} from '../../types/asmresult/asmresult.interfaces.js';
import type {PreliminaryCompilerInfo} from '../../types/compiler.interfaces.js';
import type {ParseFiltersAndOutputOptions} from '../../types/features/filters.interfaces.js';
import type {IRResultLine} from '../../types/asmresult/asmresult.interfaces.js';
import type {
    BasicExecutionResult
} from '../../types/execution/execution.interfaces.js';
import {BaseCompiler} from '../base-compiler.js';
import {resolvePathFromAppRoot} from '../utils.js';

import {BaseParser} from './argument-parsers.js';

export class HermesCompiler extends BaseCompiler {
    static get key() {
        return 'hermes';
    }

    static DUMP_BC:string = "--dump-bytecode";
    static DUMP_IR:string = "--dump-ir";
    static DUMP_LIR:string = "--dump-lir";

    constructor(compilerInfo: PreliminaryCompilerInfo, env) {
        super(compilerInfo, env);
        this.compiler.supportsIrView = true;
    }

    override processAsm(result) {
        const lineRe = /^;(\s+)(?<file>.*):(?<line>\d+):(?<col>\d+)$/;
        const bytecodeLines = result.asm.split('\n');
        const bytecodeResult: ParsedAsmResultLine[] = [];
        let sourceLoc: AsmResultSource | null = null;
        let srcText:any = null;
        for (const line of bytecodeLines) {
            srcText = line;
            const match = line.match(lineRe);
            if (match && match.groups) {
                const line = parseInt(match.groups.line);
                const column = parseInt(match.groups.col);
                sourceLoc = {line, column, file: null};
                continue;
            }
            bytecodeResult.push({text: srcText, source: sourceLoc});
            sourceLoc = null;
        }
        return {asm: bytecodeResult};
    }

    override async generateIR(inputFilename: string, options: string[], filters: ParseFiltersAndOutputOptions) {
        const execOptions = this.getDefaultExecOptions();
        // A higher max output is needed for when the user includes headers
        execOptions.maxOutput = 1024 * 1024 * 1024;
        const myopts = options.concat(["--dump-ir", "-dump-source-location=loc"])
                              .filter(e => e !== "--dump-bytecode");
        const output = await this.runCompiler(this.compiler.exe, myopts, this.filename(inputFilename), execOptions);
        if (output.code !== 0) {
            return [{text: 'Failed to run compiler to get IR code'}];
        }
        const ir = await this.processCompilerIROut(output, filters, 'example.js');
        return ir.asm;
    }

    async processCompilerIROut(output, filters: ParseFiltersAndOutputOptions, inputFilename:string) {
        const result: IRResultLine[] = [];
        // ; /Users/fbmal7/tests/obj.js:1:1
        let inputLines:any = [];
        if (output.stdout.length == 0) {
          inputLines = output.stderr;
        } else {
          inputLines = output.stdout;
        }
        const irLines = inputLines.reduce(
          (accumulator, currentValue) => accumulator.concat(currentValue.text),
          []
        );
        const lineRe = /^;(\s+)(?<file>.*):(?<line>\d+):(?<col>\d+)$/;
        let sourceLoc: AsmResultSource | null = null;
        let srcText:any = null;
        for (const line of irLines) {
            srcText = line;
            const match = lineRe.exec(line);
            if (match && match.groups) {
                const lineno = parseInt(match.groups.line || '0');
                const colno = parseInt(match.groups.col || '0');
                sourceLoc = {file: null, line: lineno, column: colno};
                continue;
            }
            result.push({text: line, source: sourceLoc });
            sourceLoc = null;
        }
        return {
            asm: result,
            labelDefinitions: {},
            languageId: 'llvm-ir',
        };
    }

    override optionsForFilter(filters: ParseFiltersAndOutputOptions, outputFilename: string, userOptions: string[]) {
        for (const opt of userOptions){
          if (opt === HermesCompiler.DUMP_BC){
            return [];
          }
          if (opt === HermesCompiler.DUMP_IR){
            return [];
          }
        }
        return [HermesCompiler.DUMP_BC];
    }

    override getArgumentParser() {
        return BaseParser;
    }

    override orderArguments(
        options: string[],
        inputFilename: string,
        libIncludes: string[],
        libOptions: string[],
        libPaths: string[],
        libLinks: string[],
        userOptions: string[],
        staticLibLinks: string[],
    ) {
        return options.concat(
            [this.filename(inputFilename)],
            libIncludes,
            libOptions,
            libPaths,
            libLinks,
            userOptions,
            staticLibLinks,
        );
    }
}
