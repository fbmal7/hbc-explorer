import {AssemblyInstructionInfo} from '../base.js';

export function getAsmOpcode(opcode: string | undefined): AssemblyInstructionInfo | undefined {
    if (!opcode) return;
    switch (opcode.toUpperCase()) {
        case "BranchInst":
            return {
                "html": "<p> Jumps to a different basic block.</p><p> %0 = BranchInst %BB1</p><p>A single operand which is the target basic block.</p><p>Terminates a basic block and 'jumps' to a different basic block.</p><p>Does not read or write from memory.</p>",
                "tooltip": " Jumps to a different basic block.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ReturnInst":
            return {
                "html": "<p>Leaves the function and returns a value.</p><p> %0 = ReturnInst %17</p><p>A single operand which is the returned value. Notice the functions that return without an explicit value return the 'undefined' value.</p><p>Terminates a basic block and transfer the control to the caller of the current function.</p><p>Does not read or write from memory.</p>",
                "tooltip": "Leaves the function and returns a value.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AllocStackInst":
            return {
                "html": "<p>Allocates a variable on the stack.</p><p> %0 = AllocStackInst $name</p><p>$name is the textual representation of the variable at the sourcecode level.</p><p>AllocStack allocates a variable on the stack. Depending on the implementation of the VM, the variables may be packed into a single frame. AllocStack values may be used by instructions in different functions that represent closures created by the current functions. AllocStack values are used to represent local and captured variables. The AllocStack itself needs to be used directly. It is not possible to save a reference to the reference. The lifetime of the AllocStack may not exceed the lifetime of the allocating function.</p><p>Does not read or write from memory.</p>",
                "tooltip": "Allocates a variable on the stack.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "LoadFrameInst":
            return {
                "html": "<p>Loads a value from a variable.</p><p> %1 = LoadFrameInst %0</p><p>The variable from which the instruction loads.</p><p>The the instruction reads from a variable. The address must be a valid variable.</p><p>Reads from memory.</p>",
                "tooltip": "Loads a value from a variable.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "LoadStackInst":
            return {
                "html": "<p>Loads a value from a stack allocated memory pointed by a reference.</p><p> %1 = LoadInst %0</p><p>The address from which the instruction loads.</p><p>The the instruction reads from memory. The address must be a valid stack address.</p><p>Reads from memory.</p>",
                "tooltip": "Loads a value from a stack allocated memory pointed by a reference.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StoreFrameInst":
            return {
                "html": "<p>Stores a value to a frame variable.</p><p> %1 = StoreFrameInst %value, %variable</p><p>%value is the value to be stored. %address is the reference to the variable where the value will be stored.</p><p>The the instruction saves a value to memory. The address must be a valid variable.</p><p>Writes to memory.</p>",
                "tooltip": "Stores a value to a frame variable.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StoreStackInst":
            return {
                "html": "<p>Stores a value to a stack allocated memory.</p><p> %1 = StoreStackInst %value, %stack_allocated</p><p>%value is the value to be stored. %address is the reference to stack allocation.</p><p>The the instruction saves a value to memory. The address must be a valid stack allocation.</p><p>Writes to memory.</p>",
                "tooltip": "Stores a value to a stack allocated memory.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AsNumberInst":
            return {
                "html": "<p>Casts a JavaScript value into a number value.</p><p> %1 = AsNumberInst %input</p><p>The value to cast.</p><p>The instruction follows the JavaScript rules for converting types into numbers.</p><p>May read or write to memory.</p>",
                "tooltip": "Casts a JavaScript value into a number value.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AsInt32Inst":
            return {
                "html": "<p>Casts a JavaScript value into a signed 32-bit integer value.</p><p> %1 = AsInt32Inst %input</p><p>The value to cast.</p><p>The instruction follows the JavaScript rules for converting types into 32-bit signed integers.</p><p>May read or write to memory.</p>",
                "tooltip": "Casts a JavaScript value into a signed 32-bit integer value.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AddEmptyStringInst":
            return {
                "html": "<p>Convert a value to string as if evaluating `value + ''`</p><p> %1 = AddEmptyStringInst %input</p><p>The value to cast.</p><p>The instruction follows the JavaScript rules for adding an empty string to a value (ES5.1 11.6.1).</p><p>May read or write to memory or throw.</p>",
                "tooltip": "Convert a value to string as if evaluating `value + ''`",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CondBranchInst":
            return {
                "html": "<p>Jumps to one of two blocks depending on a condition value.</p><p>%1 = CondBranchInst %cond, %BB1, %BB2</p><p>%cond is the condition variable, %BB1 is the 'True' block, %BB2 is the 'False' block.</p><p>The instruction observes the value of a typed value and jumps to one of two basic blocks. If the condition is evaluated as 'True' the program jumps to the 'True' block. Otherwise the program jumps to the 'False' block.</p><p>Does not read or write from memory.</p>",
                "tooltip": "Jumps to one of two blocks depending on a condition value.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CompareBranchInst":
            return {
                "html": "<p>Performs  a binary comparison of the two operands and a conditional branch depending on the result.</p><p> %0 = CompareBranch %x, %y, %BB1, %BB2</p><p>%x and %y are the operands of the binary operation, %BB1 is the 'True' block, %BB2 is the 'False' block.</p><p>The instruction follows the rules of JavaScript for each one of the binary operators defined in the instruction. If the condition is evaluated as 'True' the program jumps to the 'True' block. Otherwise the program jumps to the 'False' block.</p><p>May read and write memory.</p>",
                "tooltip": "Performs  a binary comparison of the two operands and a conditional branch depending on the result.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CreateFunction":
            return {
                "html": "<p>Constructs a new function into the current scope from its code representation.</p><p>%0 = CreateFunction %function,</p><p>%function is the function that represents the code of the generated closure.</p><p>The instruction creates a new closure that may access the lexical scope of the calling function</p><p>Does not read or write to memory.</p>",
                "tooltip": "Constructs a new function into the current scope from its code representation.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "BinaryOperatorInst":
            return {
                "html": "<p>Performs the binary operation on the two operands.</p><p> %0 = BinaryOperatorInst %x, %y</p><p>%x and %y are the operands of the binary operation.</p><p>The instruction follows the rules of JavaScript for each one of the binary operators defined in the instruction.</p><p>May read and write memory.</p>",
                "tooltip": "Performs the binary operation on the two operands.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "DirectEvalInst":
            return {
                "html": "<p>Implement a syntactical call to `eval(arg)` where `eval` is global property.</p><p> `%0 = DirectEvalInst %value1`</p><p>%value1 is the value which will be evaluated.</p><p>Implement the semantics of ES6 `PerformEval(%value1, evalRealm, strictCaller=true, direct=true)` (ES6 18.2.1.1). Note that we only support \"strictCaller=true\".</p><p>Unknown</p>",
                "tooltip": "Implement a syntactical call to `eval(arg)` where `eval` is global property.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CallInst":
            return {
                "html": "<p>Calls another function with some arguments.</p><p>%0 = CallInst %callee, %this,  %arg0, %arg1, %arg2, ...</p><p>%callee is the function to execute. %this is a reference to the 'this' value. Arguments %arg0 ... %argN are the arguments passed to the function.</p><p>The instruction passes the control to the callee, that must be of closure type. The arguments are mapped to the parameters. Unmapped parameters are initialized to 'undefined'.</p><p>May read and write memory.</p>",
                "tooltip": "Calls another function with some arguments.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ConstructInst":
            return {
                "html": "<p>Construct a new object with a constructor</p><p>%0 = ConstructInst %constructor, #undefined, %arg0, %arg1, %arg2, ...</p><p>%constructor is the constructor function to execute. #undefined is not used. %arg0 ... %argN are the arguments passed to the constructor function.</p><p>The instruction performs the steps defined in ES5.1 sec-11.2.2 and sec-13.2.2. It allocates the object and calls the constructor function with the new object and the supplied arguments.</p><p>May read and write memory.</p>",
                "tooltip": "Construct a new object with a constructor",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CallBuiltinInst":
            return {
                "html": "<p>Calls a builtin function passing \"undefined\" for this</p><p>%0 = CallBuiltinInst %builtinNumber, %undefined, %arg0, %arg1, %arg2, ...</p><p>%builtinNumber is the builtin to execute. Arguments %arg0 ... %argN are the arguments passed to the function.</p><p>The instruction passes the control to the builtin in a VM-specific way. The arguments are mapped to the parameters. Unmapped parameters are initialized to 'undefined'.</p><p>May read and write memory.</p>",
                "tooltip": "Calls a builtin function passing \"undefined\" for this",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CallIntrinsicInst":
            return {
                "html": "<p>Calls an unsafe compiler intrinsic, passing \"undefined\" for this</p><p>%0 = CallIntrinsicInst %intrinsicsIndex, %undefined, %arg0, %arg1, %arg2, ...</p><p>%intrinsicsIndex is the intrinsic to execute. Arguments %arg0 ... %argN are the arguments passed to the function.</p><p>The instruction passes the control to the intrinsics in a VM-specific way. The arguments are mapped to the parameters.</p><p>May read and write memory.</p>",
                "tooltip": "Calls an unsafe compiler intrinsic, passing \"undefined\" for this",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "GetBuiltinClosureInst":
            return {
                "html": "<p>Get a closure of a builtin function</p><p>%0 = GetBuiltinClosureInst %builtinNumber</p><p>%builtinNumber is the builtin to return the closure of.</p><p></p><p>Reads from memory.</p>",
                "tooltip": "Get a closure of a builtin function",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "LoadPropertyInst":
            return {
                "html": "<p>Loads the value of a field from a JavaScript object.</p><p> %0 = LoadPropertyInst %object, %property</p><p>%object is the object to load from. %property is the name of the field.</p><p>The instruction follows the rules of JavaScript property access in ES5.1 sec 11.2.1. The operation GetValue (ES5.1. sec 8.7.1) is then applied to the returned Reference.</p><p>May read and write memory or throw.</p>",
                "tooltip": "Loads the value of a field from a JavaScript object.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "DeletePropertyInst":
            return {
                "html": "<p>Deletes the value of a field from a JavaScript object.</p><p> %0 = DeletePropertyInst %object, %property</p><p>%object is the object to modify. %property is the name of the field.</p><p>The instruction follows the rules of JavaScript property access.</p><p>May read and write memory.</p>",
                "tooltip": "Deletes the value of a field from a JavaScript object.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StorePropertyInst":
            return {
                "html": "<p>Stores a value to field in a JavaScript object.</p><p>  %4 = StorePropertyInst %value, %object, %property</p><p>%value is the value to be stored. %object is the object where the field %property will be created or modified.</p><p>The instruction follows the rules of JavaScript property access in ES5.1 sec 11.2.1. The operation PutValue (ES5.1. sec 8.7.2) is then applied to the returned Reference.</p><p>May read and write memory or throw.</p>",
                "tooltip": "Stores a value to field in a JavaScript object.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "TryStoreGlobalPropertyInst":
            return {
                "html": "<p>Attempt to store a value into an existing field of the global object and throw if it doesn't exist.</p><p>  %4 = TryStoreGlobalPropertyInst %value, %object, %property</p><p>%value is the value to be stored. %object is the global object, where the field %property will be stored. %property must be a string literal.</p><p>Similar to StorePropertyInst, but throw if the field doesn't exist.</p><p>May read and write memory or throw.</p>",
                "tooltip": "Attempt to store a value into an existing field of the global object and throw if it doesn't exist.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StoreOwnPropertyInst":
            return {
                "html": "<p>Stores a value to an *own property* of JavaScript object.</p><p>  %4 = StoreOwnPropertyInst %value, %object, %property, %enumerable : boolean</p><p>%value is the value to be stored. %object is the object where the field with name %property will be created or modified. %enumerable determines whether a new property will be created as enumerable or not.</p><p>The instruction follows the rules of JavaScript *own* property access. The property is created or updated in the instance of the object, regardless of whether the same property already exists earlier in the prototype chain.</p><p>May read and write memory.</p>",
                "tooltip": "Stores a value to an *own property* of JavaScript object.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StoreNewOwnPropertyInst":
            return {
                "html": "<p>Create a new *own property* in what is known to be a JavaScript object.</p><p>  `%4 = StoreNewOwnPropertyInst %value, %object, %property, %enumerable : boolean`</p><p>*%value* is the value to be stored. *%object*, which must be an object, is where the field with name *%property* will be created. *%property* must be a string literal, otherwise it is impossible to guarantee that it is new. *%enumerable* determines whether the new property will be created as enumerable or not.</p><p>The instruction follows the rules of JavaScript *own* property access. The property is created in the instance of the object, regardless of whether the same property already exists earlier in the prototype chain.</p><p>May read and write memory.</p>",
                "tooltip": "Create a new *own property* in what is known to be a JavaScript object.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StoreGetterSetterInst":
            return {
                "html": "<p>Associates a pair of getter and setter with an *own* field in a JavaScript object, replacing the previous value.</p><p>  %4 = StoreGetterSetterInst %getter, %setter, %object, %property, %enumerable</p><p>%getter is a getter accessor, or undefined. %setter is a setter accessor, or undefined. %object is the object where the field %property will be created or modified. %enumerable determines whether a new property will be created as enumerable or not.</p><p>The instruction follows the rules of JavaScript property access. The property is created or updated in the instance of the object, regardless of whether the same property already exists earlier in the prototype chain. It replaces both accessors even if one or both of the parameters are undefined.</p><p>May read and write memory.</p>",
                "tooltip": "Associates a pair of getter and setter with an *own* field in a JavaScript object, replacing the previous value.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ThrowIfHasRestrictedGlobalPropertyInst":
            return {
                "html": "<p>rowIfHasRestrictedGlobalPropertyInst %name : string</p><p>| %name is the name to be checked agains global restricted properties.</p><p>Implements the semantics of ES2023 9.1.1.4.14 followed by a throw if %name is a restricted global property.</p><p>known.</p><p></p>",
                "tooltip": "rowIfHasRestrictedGlobalPropertyInst %name : string",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AllocObjectInst":
            return {
                "html": "<p>Allocates a new JavaScript object on the heap.</p><p> `%0 = AllocObjectInst %sizeHint : LiteralNumber, %parent : EmptySentinel or null or Value`</p><p>*%sizeHint% indicates that the object will need at least that many property slots. *%parent* is the optional parent to create the object with: *EmptySentinel* means use *Object.prototype*, *null* means no parent, or otherwise use the specified value.</p><p>The instruction creates a new JavaScript object on the heap. If the parent is invalid (not EmptySenyinel, null or object), it is silently ignored.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Allocates a new JavaScript object on the heap.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AllocObjectLiteralInst":
            return {
                "html": "<p>Allocates a new JavaScript object on the heap. During lowering pass it will be lowered to either an AllocObjectInst or a HBCAllocObjectFromBufferInst.</p><p> %0 = AllocObjectLiteralInst \"prop1\" : string, 10 : number</p><p>%prop_map is a vector of (Literal*, value*) pairs which represents the properties and their keys in the object literal.</p><p>The instruction creates a new JavaScript object on the heap with an initial list of properties.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Allocates a new JavaScript object on the heap. During lowering pass it will be lowered to either an AllocObjectInst or a HBCAllocObjectFromBufferInst.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "AllocArrayInst":
            return {
                "html": "<p>Allocates a new JavaScript array on the heap.</p><p> %0 = AllocArrayInst %sizeHint, %value0, %value1, ...</p><p>sizeHint tells the size of the array that the VM should allocate. It must be equal or larger than the initial list of elements in this instruction. The rest of the values are all literal values as the initial elements of the array. Non-literal values or values after elision will be inserted into the array separately.</p><p>The instruction creates a new JavaScript array on the heap with a hinted size and initial list of elements.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Allocates a new JavaScript array on the heap.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CreateArgumentsInst":
            return {
                "html": "<p>Allocates the JavaScript `arguments` array-like object on the heap.</p><p> %0 = CreateArgumentsInst</p><p>None.</p><p>The instruction creates the `arguments` object, populates it with copies of the values of the arguments (according to \"strict mode\" semantics) and sets `arguments.length` to the number of arguments (`this` isn't copied or counted). There should be only one CreateArgumentsInst in a function.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Allocates the JavaScript `arguments` array-like object on the heap.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CreateRegExpInst":
            return {
                "html": "<p>Construct a RegExp object from a regexp literal.</p><p> %0 = CreateRegExpInst \"pattern\", \"flags\"</p><p>`pattern: LiteralString` and `flags: LiteralString`</p><p>It is equivalent to calling `RegExp(pattern, flags)`, except that it calls the built-in constructor, even if `RegExp` has been overridden.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Construct a RegExp object from a regexp literal.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "SwitchInst":
            return {
                "html": "<p>The ‘switch‘ instruction is used to transfer control to one of different places.</p><p> %0 = SwitchInst %input, %default, [%val0, %block0], [%val1, %block1] ..</p><p>The instruction accepts an input, a default block, and one or more pairs of value-destination values. The value must be a primitive JS type, and the destination must be a basic block within the current function.</p><p>The semantic of the instruction is identical to a sequence of 'if' statements that compare the value of the input to each of the case statements. Repeating the same value is not allowed.</p><p>May read and write memory.</p>",
                "tooltip": "The ‘switch‘ instruction is used to transfer control to one of different places.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "GetPNamesInst":
            return {
                "html": "<p>Generates the property enumerator, which is a collection of registers that hold the state of the enumerator (iterator, object base, index, size, etc).</p><p> %0 = GetPNamesInt  %propertyAddr, %baseAddr, %indexAddr, %sizeAddr, %iteratorAddr, %onEmpty, %onLast</p><p>The first 5 parameters are addresses (stack allocated addresses) that represent the state of the property enumerator. The last two argument are jump destination for the two cases: empty object and object with some properties.</p><p>This instruction is a terminator instruction and prepares the enumerator for the GetNextPNameInst instruction to consume.</p><p>May read and write memory.</p>",
                "tooltip": "Generates the property enumerator, which is a collection of registers that hold the state of the enumerator (iterator, object base, index, size, etc).",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "GetNextPNameInst":
            return {
                "html": "<p>Loads the next property from the object property enumerator.</p><p> %0 = GetNextPNameInst %propertyAddr, %baseAddr, %indexAddr, %sizeAddr, %iteratorAddr, %onLast, %onSome</p><p>The first argument is the destination where the name of the property is written into. The next 4 arguments are the state of the property enumerator. The last two arguments are the destination blocks for: no next property, or some property available.</p><p>This instruction is a terminator instruction that uses the state that was prepared by the GetPNamesInst instruction.</p><p>May read and write memory.</p>",
                "tooltip": "Loads the next property from the object property enumerator.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CatchInst":
            return {
                "html": "<p>This instruction catches an exception, and returns that exception.</p><p>%0 = CatchInst</p><p>This instruction does not have arguments.</p><p>This instruction will be generated for each catch block and for each finally block. The current exception will be returned. CatchInst can only show up at the beginning of a basic block. The coverage and depth information for the CatchInst will be constructed dynamically later during bytecode generation.</p><p>May read and write memory.</p>",
                "tooltip": "This instruction catches an exception, and returns that exception.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ThrowInst":
            return {
                "html": "<p>This instruction will throw an exception.</p><p>%0 = ThrowInst %e</p><p>This instruction takes one parameter, which is the register that contains the exception value</p><p>This instruction is a terminator instruction that will transition the control to the CatchInst that covers this instruction with closest scope.</p><p>May read and write memory.</p>",
                "tooltip": "This instruction will throw an exception.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CheckHasInstanceInst":
            return {
                "html": "<p>Check whether an object has a particular instance.</p><p>%0 = CheckHasInstanceInst %check_result, %left, %right, %onTrue, %onFalse</p><p>This instruction takes 5 parameters: %check_result will be a write-only stack register and holds the check result, %left and %right are the operands of instanceof, and %onTrue and %onFalse are the jump targets in case of check returns true/false.</p><p>This instruction is generated as part of instanceof operator. It checks whether %right could possibly have %left as an instance, and returns the check result. If the checked object is invalid to have the target instance, it will throw an exception. It the check returns false, it jumps to the %jump_label.</p><p>May read or write memory.</p>",
                "tooltip": "Check whether an object has a particular instance.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "TryStartInst":
            return {
                "html": "<p>Mark the beginning of the try blocks.</p><p>%0 = TryStartInst %catchTargetBlock, %tryBodyBlock</p><p>This instruction takes 2 arguments: %tryBodyBlock is the block where the body of Try starts, %catchTargetBlock is the basic block that contains the CatchInst which covers this try. Both %tryBodyBlock and %catchTargetBlock are successors of this instruction.</p><p>This is a nop, used only for tracking the beginning of try blocks.</p><p>Does not read or write memory.</p>",
                "tooltip": "Mark the beginning of the try blocks.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "TryEndInst":
            return {
                "html": "<p>Mark the end of the try blocks.</p><p>%0 = TryEndInst</p><p>This instruction does not have arguments.</p><p>This is a nop, used only for tracking the end of try blocks.</p><p>Technically this instruction itself does not touch memory, however we mark it as may write to prevent optimizations going pass this instruction.</p>",
                "tooltip": "Mark the end of the try blocks.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "PhiInst":
            return {
                "html": "<p>This is a Phi node instruction.</p><p> %0 = PhiInst %value0, %block0, [%value1, %block1]</p><p>A list of pairs of value and incoming basic block.</p><p>The PhiNode needs to have a single entry for each incoming basic block of the block the PHI is located in. The incoming value must dominate the last instruction in the incoming block.</p><p>Does not read or write memory.</p>",
                "tooltip": "This is a Phi node instruction.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "MovInst":
            return {
                "html": "<p>The MOV inst represents a low-level operation of moving one register to another.</p><p> %0 = MovInst %value0</p><p>Any value.</p><p>The Mov instruction is only valid after Register Allocation in bytecode as we move away from SSA form.</p><p>Does not read or write memory.</p>",
                "tooltip": "The MOV inst represents a low-level operation of moving one register to another.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ImplicitMovInst":
            return {
                "html": "<p>The ImplicitMov inst represents moving one register to another, except the mov will be performed implicitly by an immediately-subsequent instruction. This is used to express to the optimizer instructions which modify registers other than their destination.</p><p> %0 = ImplicitMovInst %value0</p><p>Any value.</p><p>The ImplicitMov instruction is only valid after Register Allocation in bytecode as we move away from SSA form.</p><p>Does not read or write memory.</p>",
                "tooltip": "The ImplicitMov inst represents moving one register to another, except the mov will be performed implicitly by an immediately-subsequent instruction. This is used to express to the optimizer instructions which modify registers other than their destination.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "DebuggerInst":
            return {
                "html": "<p>This instruction corresponds to the JavaScript `debugger` statement.</p><p>%0 = DebuggerInst</p><p>It takes no arguments and returns no values.</p><p>Its behavior is implementation-dependent.</p><p>Does not read or write to memory.</p>",
                "tooltip": "This instruction corresponds to the JavaScript `debugger` statement.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "GetNewTargetInst":
            return {
                "html": "<p>Obtains the value of `new.target` in the current function or constructor.</p><p> %0 = GetNewTargetInst</p><p>None</p><p>It must only be called from a ES6 class constructor or ES5 function. If the callee was invoked from `new`, it returns the function object of the direct constructor, otherwise `undefined`.</p><p>Does not read or write memory</p>",
                "tooltip": "Obtains the value of `new.target` in the current function or constructor.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ThrowIfEmptyInst":
            return {
                "html": "<p>Check whether the value is \"empty\", and if it is, throw ReferenceError, otherwise return it.</p><p> %_ = ThrowIfEmptyInst %value</p><p>The value to check.</p><p>It is used to implement ES6 TDZ functionality. Variables declared with `let` are *poisoned* with *empty* until they are initialized.</p><p>Potentially throws an exception. Has no other side effects.</p>",
                "tooltip": "Check whether the value is \"empty\", and if it is, throw ReferenceError, otherwise return it.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CoerceThisNS":
            return {
                "html": "<p>Coerces its argument using the rules of \"this\" coercion to object in non-strict mode.</p><p> %0 = CoerceThisNS %value0</p><p>Any value.</p><p></p><p>Does not read or write memory (it potentially creates a new object)</p>",
                "tooltip": "Coerces its argument using the rules of \"this\" coercion to object in non-strict mode.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "CreateGenerator":
            return {
                "html": "<p>Constructs a new GeneratorInnerFunction from its code representation, and wraps it in a Generator object.</p><p>%0 = CreateGenerator %function,</p><p>%function is the function that represents the code of the generator's inner function.</p><p>Creates a new GeneratorInnerFunction closure that may access the environment and wraps it in a generator</p><p>Does not read or write to memory (creates a new object).</p>",
                "tooltip": "Constructs a new GeneratorInnerFunction from its code representation, and wraps it in a Generator object.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "StartGenerator":
            return {
                "html": "<p>Jump to the proper first instruction to execute in a GeneratorInnerFunction</p><p> %0 = StartGenerator</p><p>None</p><p>Jumps to a BasicBlock which begins with a ResumeGenerator and sets the internal generator state to \"executing\", but does not handle next(), return(), or throw() as requested by the user.</p><p>Reads and writes memory. Restores the stack based on saved state, and jumps to another BasicBlock</p>",
                "tooltip": "Jump to the proper first instruction to execute in a GeneratorInnerFunction",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "SaveAndYield":
            return {
                "html": "<p>Saves information needed to resume generator execution and yield.</p><p> %0 = SaveAndYield %value, %next</p><p>%value is the value to yield, %next is the next BasicBlock to execute upon resuming, which must begin with a ResumeGeneratorInst (generated alongside SaveAndYield).</p><p>Saves the frame variables and the next IP to the closure, and yield execution.</p><p>Reads and writes to memory, may throw or execute.</p>",
                "tooltip": "Saves information needed to resume generator execution and yield.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "ResumeGenerator":
            return {
                "html": "<p>Perform the user-requested action on resuming a generator.</p><p> %0 = ResumeGenerator %isReturn</p><p>%isReturn is an output argument set to true if the user requested a return, false otherwise.</p><p>If the user requested next(), continue on. If the user requested throw(), throw. If the user requested return(), set %isReturn to true and continue. Subsequent instructions will check %isReturn and execute any `finally` handlers, for example, before returning.</p><p>May read and write memory. (may throw)</p>",
                "tooltip": "Perform the user-requested action on resuming a generator.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "IteratorBegin":
            return {
                "html": "<p>Begins array destructuring on a given iterable source.</p><p> %0 = IteratorBegin %sourceOrNext</p><p>%sourceOrNext[in/out] is the stack location for source to destructure from. Is set to source if performing array iteration, else set to the `.next()` method of the iterator.</p><p>If %sourceOrNext is an Array then it remains unmodified and the instruction returns `0`, but if it is not, it is replaced with the 'next' method so that it can be called on each step of the iteration and the instruction returns the iterator object. If the `[Symbol.iterator]` function throws, this instruction will throw.</p><p>May read and write memory, may throw or execute.</p>",
                "tooltip": "Begins array destructuring on a given iterable source.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "IteratorNext":
            return {
                "html": "<p>Destructures the next value from a given iterator.</p><p> %0 = IteratorNext %iterator %sourceOrNext</p><p>%iterator is the index or the iterator. %sourceOrNext is the input stack location (source to destructure from) or the next method.</p><p>If %iterator is an index: if %iterator is less than `%sourceOrNext.length`, reads the value from %sourceOrNext and increments the index, else sets %iterator to undefined and returns undefined. If %iterator is an actual iterator, calls %sourceOrNext as a next method and evaluates to the result value. When iteration is complete, sets %iterator to undefined as a signal that we're done.</p><p></p>",
                "tooltip": "Destructures the next value from a given iterator.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "IteratorClose":
            return {
                "html": "<p>Closes an iterator if it exists.</p><p> %0 = IteratorClose %iterator %ignoreInnerException</p><p>%iterator is the index or the iterator. %ignoreInnerException is a boolean literal.</p><p>If %iterator is an iterator, calls `.return()` on it to close it. Otherwise, this is a no-op. If `.return()` throws, the exception is ignored when %ignoreInnerException is true.</p><p>May read and write memory, may throw or execute.</p>",
                "tooltip": "Closes an iterator if it exists.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "UnreachableInst":
            return {
                "html": "<p>Crashes the VM (ifndef NDEBUG).</p><p> %0 = UnreachableInst</p><p>None.</p><p>Can be added to stubs and similar to verify that they are never executed.</p><p>Marked as reading/writing memory to avoid reordering.</p>",
                "tooltip": "Crashes the VM (ifndef NDEBUG).",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "HBCGetGlobalObjectInst":
            return {
                "html": "<p>Obtain the \"global\" object</p><p> %0 = HBCGetGlobalObjectInst</p><p>None.</p><p>The instruction returns a reference to the \"global\" object.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Obtain the \"global\" object",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "HBCCreateFunction":
            return {
                "html": "<p>Create a new closure capturing the specified environment and using the specified body</p><p>%0 = HBCCreateFunction %environment, %body,</p><p>%environment is the closure's environment. %body is the closure's body.</p><p>The instruction creates a new closure that may access the specified environment.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Create a new closure capturing the specified environment and using the specified body",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "HBCCreateGenerator":
            return {
                "html": "<p>Constructs a new Generator into the current scope from its code representation.</p><p>%0 = CreateGenerator %environment, %body,</p><p>%environment is the closure's environment, %body is the closure's body.</p><p>The instruction creates a new GeneratorInnerFunction access the environment and wraps it in a Generator.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Constructs a new Generator into the current scope from its code representation.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "HBCAllocObjectFromBufferInst":
            return {
                "html": "<p>Allocates a new JavaScript object on the heap, and initializes it with values from the object buffer.</p><p> %0 = HBCAllocObjectFromBufferInst %value0, %value1, ...</p><p>The values are all literal values, with alternating keys and values. Non-literal values will be inserted into the array separately.</p><p>The instruction creates a new JavaScript object on the heap with an initial list of properties.</p><p>Does not read or write to memory.</p>",
                "tooltip": "Allocates a new JavaScript object on the heap, and initializes it with values from the object buffer.",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        case "HBCCallNInst":
            return {
                "html": "<p>Calls a function with a fixed number of arguments (from 1 to 4, inclusive).</p><p>%0 = HBCCallNInst %callee, %this, %arg0, %arg1, %arg2</p><p>%callee is the function to execute. %this is a reference to the 'this' value. Arguments %arg0 ... %argN are the arguments passed to the function.</p><p>The instruction copies its arguments (starting from this) into the parameter-passing registers at the end of the frame, and passes the control to the callee, which must be of closure type. The arguments are mapped to the parameters. Unmapped parameters are initialized to 'undefined'.</p><p>May read and write memory.</p>",
                "tooltip": "Calls a function with a fixed number of arguments (from 1 to 4, inclusive).",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };
        }
}
