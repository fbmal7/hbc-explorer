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
import type {BasicExecutionResult} from '../../types/execution/execution.interfaces.js';
import {BaseCompiler} from '../base-compiler.js';
import {resolvePathFromAppRoot} from '../utils.js';

import {BaseParser} from './argument-parsers.js';

export class HermesCompiler extends BaseCompiler {
    static get key() {
        return 'hermes';
    }

    static DUMP_BC = '--dump-bytecode';
    static DUMP_IR = '--dump-ir';
    static DUMP_LIR = '--dump-lir';
    static DUMP_LOC = '-dump-source-location=loc';

    constructor(compilerInfo: PreliminaryCompilerInfo, env) {
        super(compilerInfo, env);
        this.compiler.supportsIrView = true;
    }

    override processAsm(result) {
        const formatted = HermesCompiler.processNumberedLines(result.asm.split('\n'));
        return {asm: formatted};
    }

    override async generateIR(inputFilename: string, userOptions: string[], filters: ParseFiltersAndOutputOptions) {
        const execOptions = this.getDefaultExecOptions();
        execOptions.maxOutput = 1024 * 1024 * 1024;
        const output = await this.runCompiler(
            this.compiler.exe,
            HermesCompiler.optionsForIR(userOptions),
            this.filename(inputFilename),
            execOptions,
        );
        if (output.code !== 0) {
            return [{text: 'Failed to run compiler to get IR code'}];
        }
        const ir = await this.processCompilerIROut(output, filters, 'example.js');
        return ir.asm;
    }

    // Compute the options passed to the compiler for generating bytecode.
    // We will allow users to also pass -dump-ir at the compiler.
    override optionsForFilter(filters: ParseFiltersAndOutputOptions, outputFilename: string, userOptions: string[]) {
        // If the user asked for BC or (L)IR already, don't append any new options.
        // Otherwise default to dumping BC.
        const dumpers = [HermesCompiler.DUMP_BC, HermesCompiler.DUMP_IR, HermesCompiler.DUMP_LIR];
        for (const opt of userOptions) {
            if (dumpers.includes(opt)) {
                return [];
            }
        }
        return [HermesCompiler.DUMP_BC];
    }

    static optionsForIR(userOptions: string[]) {
        // We need to make sure we always pass in DUMP_IR and DUMP_LOC, but we can't have any duplicates.
        // So if the user already typed those, don't add them again.
        // We also need to keep passing in whatever else the user had typed.
        // DUMP_BC is always passed in from the first step of the compiler, so we need to filter that out as well.
        const opts = userOptions.filter(
            e => e !== HermesCompiler.DUMP_BC && e !== HermesCompiler.DUMP_IR && e !== HermesCompiler.DUMP_LOC,
        );
        return opts.concat(HermesCompiler.DUMP_IR, HermesCompiler.DUMP_LOC);
    }

    async processCompilerIROut(output, filters: ParseFiltersAndOutputOptions, inputFilename: string) {
        const irLines = output.stdout.reduce((accumulator, currentValue) => accumulator.concat(currentValue.text), []);
        return {
            asm: HermesCompiler.processNumberedLines(irLines),
            labelDefinitions: {},
            languageId: 'hermes',
        };
    }

    // Consume an array of lines formatted with line numbers as Hermes emits them
    // and turn them into an array of {text, sourceLoc}
    static processNumberedLines(lines: string[]) {
        // ; file.js:20:19
        //   %0 = CreateScopeInst %S{global#0()#1}
        // So whenever there is an annotated line number,
        // it applies to the next instruction.
        const result: ParsedAsmResultLine[] = [];
        const lineRe = /^;(\s+)(?<file>.*):(?<line>\d+):(?<col>\d+)$/;
        let sourceLoc: AsmResultSource | null = null;
        for (const line of lines) {
            const match = lineRe.exec(line);
            if (match && match.groups) {
                const line = parseInt(match.groups.line || '0');
                const column = parseInt(match.groups.col || '0');
                sourceLoc = {line, column, file: null};
                continue;
            }
            result.push({text: line, source: sourceLoc});
            sourceLoc = null;
        }
        return result;
    }
}
