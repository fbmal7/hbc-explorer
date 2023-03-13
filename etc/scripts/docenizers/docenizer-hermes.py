md = r"""### BranchInst

BranchInst | _
--- | --- |
Description  | Jumps to a different basic block.
Example |  %0 = BranchInst %BB1
Arguments | A single operand which is the target basic block.
Semantics | Terminates a basic block and 'jumps' to a different basic block.
Effects | Does not read or write from memory.

### ReturnInst

ReturnInst | _
--- | --- |
Description | Leaves the function and returns a value.
Example |  %0 = ReturnInst %17
Arguments | A single operand which is the returned value. Notice the functions that return without an explicit value return the 'undefined' value.
Semantics | Terminates a basic block and transfer the control to the caller of the current function.
Effects | Does not read or write from memory.

### AllocStackInst

AllocStackInst | _
--- | --- |
Description | Allocates a variable on the stack.
Example |  %0 = AllocStackInst $name
Arguments | $name is the textual representation of the variable at the sourcecode level.
Semantics | AllocStack allocates a variable on the stack. Depending on the implementation of the VM, the variables may be packed into a single frame. AllocStack values may be used by instructions in different functions that represent closures created by the current functions. AllocStack values are used to represent local and captured variables. The AllocStack itself needs to be used directly. It is not possible to save a reference to the reference. The lifetime of the AllocStack may not exceed the lifetime of the allocating function.
Effects | Does not read or write from memory.

### LoadFrameInst

LoadFrameInst | _
--- | --- |
Description | Loads a value from a variable.
Example |  %1 = LoadFrameInst %0
Arguments | The variable from which the instruction loads.
Semantics | The the instruction reads from a variable. The address must be a valid variable.
Effects | Reads from memory.


### LoadStackInst

LoadStackInst | _
--- | --- |
Description | Loads a value from a stack allocated memory pointed by a reference.
Example |  %1 = LoadInst %0
Arguments | The address from which the instruction loads.
Semantics | The the instruction reads from memory. The address must be a valid stack address.
Effects | Reads from memory.

### StoreFrameInst

StoreFrameInst | _
--- | --- |
Description | Stores a value to a frame variable.
Example |  %1 = StoreFrameInst %value, %variable
Arguments | %value is the value to be stored. %address is the reference to the variable where the value will be stored.
Semantics | The the instruction saves a value to memory. The address must be a valid variable.
Effects | Writes to memory.

### StoreStackInst

StoreStackInst | _
--- | --- |
Description | Stores a value to a stack allocated memory.
Example |  %1 = StoreStackInst %value, %stack_allocated
Arguments | %value is the value to be stored. %address is the reference to stack allocation.
Semantics | The the instruction saves a value to memory. The address must be a valid stack allocation.
Effects | Writes to memory.

### AsNumberInst

AsNumberInst | _
--- | --- |
Description | Casts a JavaScript value into a number value.
Example |  %1 = AsNumberInst %input
Arguments | The value to cast.
Semantics | The instruction follows the JavaScript rules for converting types into numbers.
Effects | May read or write to memory.

### AsInt32Inst

AsInt32Inst | _
--- | --- |
Description | Casts a JavaScript value into a signed 32-bit integer value.
Example |  %1 = AsInt32Inst %input
Arguments | The value to cast.
Semantics | The instruction follows the JavaScript rules for converting types into 32-bit signed integers.
Effects | May read or write to memory.


### AddEmptyStringInst

AddEmptyStringInst | _
--- | --- |
Description | Convert a value to string as if evaluating `value + ''`
Example |  %1 = AddEmptyStringInst %input
Arguments | The value to cast.
Semantics | The instruction follows the JavaScript rules for adding an empty string to a value (ES5.1 11.6.1).
Effects | May read or write to memory or throw.

### CondBranchInst

CondBranchInst | _
--- | --- |
Description | Jumps to one of two blocks depending on a condition value.
Example | %1 = CondBranchInst %cond, %BB1, %BB2
Arguments | %cond is the condition variable, %BB1 is the 'True' block, %BB2 is the 'False' block.
Semantics | The instruction observes the value of a typed value and jumps to one of two basic blocks. If the condition is evaluated as 'True' the program jumps to the 'True' block. Otherwise the program jumps to the 'False' block.
Effects | Does not read or write from memory.

### CompareBranchInst

CompareBranchInst | _
--- | --- |
Description | Performs  a binary comparison of the two operands and a conditional branch depending on the result.
Example |  %0 = CompareBranch %x, %y, %BB1, %BB2
Arguments | %x and %y are the operands of the binary operation, %BB1 is the 'True' block, %BB2 is the 'False' block.
Semantics | The instruction follows the rules of JavaScript for each one of the binary operators defined in the instruction. If the condition is evaluated as 'True' the program jumps to the 'True' block. Otherwise the program jumps to the 'False' block.
Effects | May read and write memory.

### CreateFunction

CreateFunction | _
--- | --- |
Description | Constructs a new function into the current scope from its code representation.
Example | %0 = CreateFunction %function,
Arguments | %function is the function that represents the code of the generated closure.
Semantics | The instruction creates a new closure that may access the lexical scope of the calling function
Effects | Does not read or write to memory.

### BinaryOperatorInst

BinaryOperatorInst | _
--- | --- |
Description | Performs the binary operation on the two operands.
Example |  %0 = BinaryOperatorInst %x, %y
Arguments | %x and %y are the operands of the binary operation.
Semantics | The instruction follows the rules of JavaScript for each one of the binary operators defined in the instruction.
Effects | May read and write memory.

### DirectEvalInst

DirectEvalInst | _
--- | --- |
Description | Implement a syntactical call to `eval(arg)` where `eval` is global property.
Example |  `%0 = DirectEvalInst %value1`
Arguments | %value1 is the value which will be evaluated.
Semantics | Implement the semantics of ES6 `PerformEval(%value1, evalRealm, strictCaller=true, direct=true)` (ES6 18.2.1.1). Note that we only support "strictCaller=true".
Effects | Unknown

### CallInst

CallInst | _
--- | --- |
Description | Calls another function with some arguments.
Example | %0 = CallInst %callee, %this,  %arg0, %arg1, %arg2, ...
Arguments | %callee is the function to execute. %this is a reference to the 'this' value. Arguments %arg0 ... %argN are the arguments passed to the function.
Semantics | The instruction passes the control to the callee, that must be of closure type. The arguments are mapped to the parameters. Unmapped parameters are initialized to 'undefined'.
Effects | May read and write memory.

### ConstructInst

ConstructInst | _
--- | --- |
Description | Construct a new object with a constructor
Example | %0 = ConstructInst %constructor, #undefined, %arg0, %arg1, %arg2, ...
Arguments | %constructor is the constructor function to execute. #undefined is not used. %arg0 ... %argN are the arguments passed to the constructor function.
Semantics | The instruction performs the steps defined in ES5.1 sec-11.2.2 and sec-13.2.2. It allocates the object and calls the constructor function with the new object and the supplied arguments.
Effects | May read and write memory.

### CallBuiltinInst

CallBuiltinInst | _
--- | --- |
Description | Calls a builtin function passing "undefined" for this
Example | %0 = CallBuiltinInst %builtinNumber, %undefined, %arg0, %arg1, %arg2, ...
Arguments | %builtinNumber is the builtin to execute. Arguments %arg0 ... %argN are the arguments passed to the function.
Semantics | The instruction passes the control to the builtin in a VM-specific way. The arguments are mapped to the parameters. Unmapped parameters are initialized to 'undefined'.
Effects | May read and write memory.

### CallIntrinsicInst

CallIntrinsicInst | _
--- | --- |
Description | Calls an unsafe compiler intrinsic, passing "undefined" for this
Example | %0 = CallIntrinsicInst %intrinsicsIndex, %undefined, %arg0, %arg1, %arg2, ...
Arguments | %intrinsicsIndex is the intrinsic to execute. Arguments %arg0 ... %argN are the arguments passed to the function.
Semantics | The instruction passes the control to the intrinsics in a VM-specific way. The arguments are mapped to the parameters.
Effects | May read and write memory.

### GetBuiltinClosureInst

GetBuiltinClosureInst | _
--- | --- |
Description | Get a closure of a builtin function
Example | %0 = GetBuiltinClosureInst %builtinNumber
Arguments | %builtinNumber is the builtin to return the closure of.
Semantics |
Effects | Reads from memory.

### LoadPropertyInst

LoadPropertyInst | _
--- | --- |
Description | Loads the value of a field from a JavaScript object.
Example |  %0 = LoadPropertyInst %object, %property
Arguments | %object is the object to load from. %property is the name of the field.
Semantics | The instruction follows the rules of JavaScript property access in ES5.1 sec 11.2.1. The operation GetValue (ES5.1. sec 8.7.1) is then applied to the returned Reference.
Effects | May read and write memory or throw.

TryLoadGlobalPropertyInst | _
--- | --- |
Description | Loads the value of an existing field from the global object or throw if it doesn't exist.
Example |  %0 = TryLoadGlobalPropertyInst %object, %property
Arguments | %object is the global object. %property is the name of the field, which must be a string literal.
Semantics | Similar to LoadPropertyInst, but throw if the field doesn't exist.
Effects | May read and write memory or throw.

### DeletePropertyInst

DeletePropertyInst | _
--- | --- |
Description | Deletes the value of a field from a JavaScript object.
Example |  %0 = DeletePropertyInst %object, %property
Arguments | %object is the object to modify. %property is the name of the field.
Semantics | The instruction follows the rules of JavaScript property access.
Effects | May read and write memory.

### StorePropertyInst

StorePropertyInst | _
--- | --- |
Description | Stores a value to field in a JavaScript object.
Example |   %4 = StorePropertyInst %value, %object, %property
Arguments | %value is the value to be stored. %object is the object where the field %property will be created or modified.
Semantics | The instruction follows the rules of JavaScript property access in ES5.1 sec 11.2.1. The operation PutValue (ES5.1. sec 8.7.2) is then applied to the returned Reference.
Effects | May read and write memory or throw.

### TryStoreGlobalPropertyInst

TryStoreGlobalPropertyInst | _
--- | --- |
Description | Attempt to store a value into an existing field of the global object and throw if it doesn't exist.
Example |   %4 = TryStoreGlobalPropertyInst %value, %object, %property
Arguments | %value is the value to be stored. %object is the global object, where the field %property will be stored. %property must be a string literal.
Semantics | Similar to StorePropertyInst, but throw if the field doesn't exist.
Effects | May read and write memory or throw.

### StoreOwnPropertyInst

StoreOwnPropertyInst | _
--- | --- |
Description | Stores a value to an *own property* of JavaScript object.
Example |   %4 = StoreOwnPropertyInst %value, %object, %property, %enumerable : boolean
Arguments | %value is the value to be stored. %object is the object where the field with name %property will be created or modified. %enumerable determines whether a new property will be created as enumerable or not.
Semantics | The instruction follows the rules of JavaScript *own* property access. The property is created or updated in the instance of the object, regardless of whether the same property already exists earlier in the prototype chain.
Effects | May read and write memory.

### StoreNewOwnPropertyInst

StoreNewOwnPropertyInst | _
--- | --- |
Description | Create a new *own property* in what is known to be a JavaScript object.
Example |   `%4 = StoreNewOwnPropertyInst %value, %object, %property, %enumerable : boolean`
Arguments | *%value* is the value to be stored. *%object*, which must be an object, is where the field with name *%property* will be created. *%property* must be a string literal, otherwise it is impossible to guarantee that it is new. *%enumerable* determines whether the new property will be created as enumerable or not.
Semantics | The instruction follows the rules of JavaScript *own* property access. The property is created in the instance of the object, regardless of whether the same property already exists earlier in the prototype chain.
Effects | May read and write memory.

### StoreGetterSetterInst

StoreGetterSetterInst | _
--- | --- |
Description | Associates a pair of getter and setter with an *own* field in a JavaScript object, replacing the previous value.
Example |   %4 = StoreGetterSetterInst %getter, %setter, %object, %property, %enumerable
Arguments | %getter is a getter accessor, or undefined. %setter is a setter accessor, or undefined. %object is the object where the field %property will be created or modified. %enumerable determines whether a new property will be created as enumerable or not.
Semantics | The instruction follows the rules of JavaScript property access. The property is created or updated in the instance of the object, regardless of whether the same property already exists earlier in the prototype chain. It replaces both accessors even if one or both of the parameters are undefined.
Effects | May read and write memory.

### ThrowIfHasRestrictedGlobalPropertyInst
ThrowIfHasRestrictedGlobalPropertyInst | _
--- | --- |
Description | Raises an exception if the given name is a restricted global property.
Example |   ThrowIfHasRestrictedGlobalPropertyInst %name : string
Arguments | %name is the name to be checked agains global restricted properties.
Semantics | Implements the semantics of ES2023 9.1.1.4.14 followed by a throw if %name is a restricted global property.
Effects | Unknown.

### AllocObjectInst

AllocObjectInst | _
--- | --- |
Description | Allocates a new JavaScript object on the heap.
Example |  `%0 = AllocObjectInst %sizeHint : LiteralNumber, %parent : EmptySentinel or null or Value`
Arguments | *%sizeHint% indicates that the object will need at least that many property slots. *%parent* is the optional parent to create the object with: *EmptySentinel* means use *Object.prototype*, *null* means no parent, or otherwise use the specified value.
Semantics | The instruction creates a new JavaScript object on the heap. If the parent is invalid (not EmptySenyinel, null or object), it is silently ignored.
Effects | Does not read or write to memory.

### AllocObjectLiteralInst

AllocObjectLiteralInst | _
--- | --- |
Description | Allocates a new JavaScript object on the heap. During lowering pass it will be lowered to either an AllocObjectInst or a HBCAllocObjectFromBufferInst.
Example |  %0 = AllocObjectLiteralInst "prop1" : string, 10 : number
Arguments | %prop_map is a vector of (Literal*, value*) pairs which represents the properties and their keys in the object literal.
Semantics | The instruction creates a new JavaScript object on the heap with an initial list of properties.
Effects | Does not read or write to memory.

### AllocArrayInst

AllocArrayInst | _
--- | --- |
Description | Allocates a new JavaScript array on the heap.
Example |  %0 = AllocArrayInst %sizeHint, %value0, %value1, ...
Arguments | sizeHint tells the size of the array that the VM should allocate. It must be equal or larger than the initial list of elements in this instruction. The rest of the values are all literal values as the initial elements of the array. Non-literal values or values after elision will be inserted into the array separately.
Semantics | The instruction creates a new JavaScript array on the heap with a hinted size and initial list of elements.
Effects | Does not read or write to memory.

### CreateArgumentsInst

CreateArgumentsInst | _
--- | --- |
Description | Allocates the JavaScript `arguments` array-like object on the heap.
Example |  %0 = CreateArgumentsInst
Arguments | None.
Semantics | The instruction creates the `arguments` object, populates it with copies of the values of the arguments (according to "strict mode" semantics) and sets `arguments.length` to the number of arguments (`this` isn't copied or counted). There should be only one CreateArgumentsInst in a function.
Effects | Does not read or write to memory.

### CreateRegExpInst

CreateRegExpInst | _
--- | --- |
Description | Construct a RegExp object from a regexp literal.
Example |  %0 = CreateRegExpInst "pattern", "flags"
Arguments | `pattern: LiteralString` and `flags: LiteralString`
Semantics | It is equivalent to calling `RegExp(pattern, flags)`, except that it calls the built-in constructor, even if `RegExp` has been overridden.
Effects | Does not read or write to memory.

### SwitchInst

SwitchInst | _
--- | --- |
Description | The ‘switch‘ instruction is used to transfer control to one of different places.
Example |  %0 = SwitchInst %input, %default, [%val0, %block0], [%val1, %block1] ..
Arguments | The instruction accepts an input, a default block, and one or more pairs of value-destination values. The value must be a primitive JS type, and the destination must be a basic block within the current function.
Semantics | The semantic of the instruction is identical to a sequence of 'if' statements that compare the value of the input to each of the case statements. Repeating the same value is not allowed.
Effects | May read and write memory.

### GetPNamesInst

GetPNamesInt | _
--- | --- |
Description | Generates the property enumerator, which is a collection of registers that hold the state of the enumerator (iterator, object base, index, size, etc).
Example |  %0 = GetPNamesInt  %propertyAddr, %baseAddr, %indexAddr, %sizeAddr, %iteratorAddr, %onEmpty, %onLast
Arguments | The first 5 parameters are addresses (stack allocated addresses) that represent the state of the property enumerator. The last two argument are jump destination for the two cases: empty object and object with some properties.
Semantics | This instruction is a terminator instruction and prepares the enumerator for the GetNextPNameInst instruction to consume.
Effects | May read and write memory.

### GetNextPNameInst

GetNextPNameInst | _
--- | --- |
Description | Loads the next property from the object property enumerator.
Example |  %0 = GetNextPNameInst %propertyAddr, %baseAddr, %indexAddr, %sizeAddr, %iteratorAddr, %onLast, %onSome
Arguments | The first argument is the destination where the name of the property is written into. The next 4 arguments are the state of the property enumerator. The last two arguments are the destination blocks for: no next property, or some property available.
Semantics | This instruction is a terminator instruction that uses the state that was prepared by the GetPNamesInst instruction.
Effects | May read and write memory.

### CatchInst

CatchInst | _
--- | --- |
Description | This instruction catches an exception, and returns that exception.
Example | %0 = CatchInst
Arguments | This instruction does not have arguments.
Semantics | This instruction will be generated for each catch block and for each finally block. The current exception will be returned. CatchInst can only show up at the beginning of a basic block. The coverage and depth information for the CatchInst will be constructed dynamically later during bytecode generation.
Effects | May read and write memory.

### ThrowInst

ThrowInst | _
--- | --- |
Description | This instruction will throw an exception.
Example | %0 = ThrowInst %e
Arguments | This instruction takes one parameter, which is the register that contains the exception value
Semantics | This instruction is a terminator instruction that will transition the control to the CatchInst that covers this instruction with closest scope.
Effects | May read and write memory.

### CheckHasInstanceInst

CheckHasInstanceInst | _
--- | --- |
Description | Check whether an object has a particular instance.
Example | %0 = CheckHasInstanceInst %check_result, %left, %right, %onTrue, %onFalse
Arguments | This instruction takes 5 parameters: %check_result will be a write-only stack register and holds the check result, %left and %right are the operands of instanceof, and %onTrue and %onFalse are the jump targets in case of check returns true/false.
Semantics | This instruction is generated as part of instanceof operator. It checks whether %right could possibly have %left as an instance, and returns the check result. If the checked object is invalid to have the target instance, it will throw an exception. It the check returns false, it jumps to the %jump_label.
Effects | May read or write memory.

### TryStartInst

TryStartInst | _
--- | --- |
Description | Mark the beginning of the try blocks.
Example | %0 = TryStartInst %catchTargetBlock, %tryBodyBlock
Arguments | This instruction takes 2 arguments: %tryBodyBlock is the block where the body of Try starts, %catchTargetBlock is the basic block that contains the CatchInst which covers this try. Both %tryBodyBlock and %catchTargetBlock are successors of this instruction.
Semantics | This is a nop, used only for tracking the beginning of try blocks.
Effects | Does not read or write memory.

### TryEndInst

TryEndInst | _
--- | --- |
Description | Mark the end of the try blocks.
Example | %0 = TryEndInst
Arguments | This instruction does not have arguments.
Semantics | This is a nop, used only for tracking the end of try blocks.
Effects | Technically this instruction itself does not touch memory, however we mark it as may write to prevent optimizations going pass this instruction.

### PhiInst

PhiInst | _
--- | --- |
Description | This is a Phi node instruction.
Example |  %0 = PhiInst %value0, %block0, [%value1, %block1]
Arguments | A list of pairs of value and incoming basic block.
Semantics | The PhiNode needs to have a single entry for each incoming basic block of the block the PHI is located in. The incoming value must dominate the last instruction in the incoming block.
Effects | Does not read or write memory.

### MovInst

MovInst | _
--- | --- |
Description | The MOV inst represents a low-level operation of moving one register to another.
Example |  %0 = MovInst %value0
Arguments | Any value.
Semantics | The Mov instruction is only valid after Register Allocation in bytecode as we move away from SSA form.
Effects | Does not read or write memory.

### ImplicitMovInst

ImplicitMovInst | _
--- | --- |
Description | The ImplicitMov inst represents moving one register to another, except the mov will be performed implicitly by an immediately-subsequent instruction. This is used to express to the optimizer instructions which modify registers other than their destination.
Example |  %0 = ImplicitMovInst %value0
Arguments | Any value.
Semantics | The ImplicitMov instruction is only valid after Register Allocation in bytecode as we move away from SSA form.
Effects | Does not read or write memory.


### DebuggerInst

DebuggerInst | _
--- | --- |
Description | This instruction corresponds to the JavaScript `debugger` statement.
Example | %0 = DebuggerInst
Arguments | It takes no arguments and returns no values.
Semantics | Its behavior is implementation-dependent.
Effects | Does not read or write to memory.

### GetNewTargetInst

GetNewTargetInst | _
--- | --- |
Description | Obtains the value of `new.target` in the current function or constructor.
Example |  %0 = GetNewTargetInst
Arguments | None
Semantics | It must only be called from a ES6 class constructor or ES5 function. If the callee was invoked from `new`, it returns the function object of the direct constructor, otherwise `undefined`.
Effects | Does not read or write memory

### ThrowIfEmptyInst

ThrowIfEmptyInst | _
--- | --- |
Description | Check whether the value is "empty", and if it is, throw ReferenceError, otherwise return it.
Example |  %_ = ThrowIfEmptyInst %value
Arguments | The value to check.
Semantics | It is used to implement ES6 TDZ functionality. Variables declared with `let` are *poisoned* with *empty* until they are initialized.
Effects | Potentially throws an exception. Has no other side effects.

### CoerceThisNS

CoerceThisNS | _
--- | --- |
Description | Coerces its argument using the rules of "this" coercion to object in non-strict mode.
Example |  %0 = CoerceThisNS %value0
Arguments | Any value.
Semantics |
Effects | Does not read or write memory (it potentially creates a new object)

### CreateGenerator

CreateGenerator | _
--- | --- |
Description | Constructs a new GeneratorInnerFunction from its code representation, and wraps it in a Generator object.
Example | %0 = CreateGenerator %function,
Arguments | %function is the function that represents the code of the generator's inner function.
Semantics | Creates a new GeneratorInnerFunction closure that may access the environment and wraps it in a generator
Effects | Does not read or write to memory (creates a new object).

### StartGenerator

StartGenerator | _
--- | --- |
Description | Jump to the proper first instruction to execute in a GeneratorInnerFunction
Example |  %0 = StartGenerator
Arguments | None
Semantics | Jumps to a BasicBlock which begins with a ResumeGenerator and sets the internal generator state to "executing", but does not handle next(), return(), or throw() as requested by the user.
Effects | Reads and writes memory. Restores the stack based on saved state, and jumps to another BasicBlock

### SaveAndYield

SaveAndYield | _
--- | --- |
Description | Saves information needed to resume generator execution and yield.
Example |  %0 = SaveAndYield %value, %next
Arguments | %value is the value to yield, %next is the next BasicBlock to execute upon resuming, which must begin with a ResumeGeneratorInst (generated alongside SaveAndYield).
Semantics | Saves the frame variables and the next IP to the closure, and yield execution.
Effects | Reads and writes to memory, may throw or execute.

### ResumeGenerator

ResumeGenerator | _
--- | --- |
Description | Perform the user-requested action on resuming a generator.
Example |  %0 = ResumeGenerator %isReturn
Arguments | %isReturn is an output argument set to true if the user requested a return, false otherwise.
Semantics | If the user requested next(), continue on. If the user requested throw(), throw. If the user requested return(), set %isReturn to true and continue. Subsequent instructions will check %isReturn and execute any `finally` handlers, for example, before returning.
Effects | May read and write memory. (may throw)

### IteratorBegin

IteratorBegin | _
--- | --- |
Description | Begins array destructuring on a given iterable source.
Example |  %0 = IteratorBegin %sourceOrNext
Arguments | %sourceOrNext[in/out] is the stack location for source to destructure from. Is set to source if performing array iteration, else set to the `.next()` method of the iterator.
Semantics | If %sourceOrNext is an Array then it remains unmodified and the instruction returns `0`, but if it is not, it is replaced with the 'next' method so that it can be called on each step of the iteration and the instruction returns the iterator object. If the `[Symbol.iterator]` function throws, this instruction will throw.
Effects | May read and write memory, may throw or execute.

### IteratorNext

IteratorNext | _
--- | --- |
Description | Destructures the next value from a given iterator.
Example |  %0 = IteratorNext %iterator %sourceOrNext
Arguments | %iterator is the index or the iterator. %sourceOrNext is the input stack location (source to destructure from) or the next method.
Semantics | If %iterator is an index: if %iterator is less than `%sourceOrNext.length`, reads the value from %sourceOrNext and increments the index, else sets %iterator to undefined and returns undefined. If %iterator is an actual iterator, calls %sourceOrNext as a next method and evaluates to the result value. When iteration is complete, sets %iterator to undefined as a signal that we're done.
```
if (typeof %iterator === 'undefined') {
  return undefined;
}
if (typeof %iterator === 'number') {
  if (%iterator >= %sourceOrNext.length) {
    %iterator = undefined;
    return undefined;
  }
  return %sourceOrNext[%iterator];
}
var iterResult = %sourceOrNext();
if (iterResult.done) {
  %iterator = undefined;
  return undefined;
}
return iterResult.value;
```
Effects | May read and write memory, may throw or execute.

### IteratorClose

IteratorClose | _
--- | --- |
Description | Closes an iterator if it exists.
Example |  %0 = IteratorClose %iterator %ignoreInnerException
Arguments | %iterator is the index or the iterator. %ignoreInnerException is a boolean literal.
Semantics | If %iterator is an iterator, calls `.return()` on it to close it. Otherwise, this is a no-op. If `.return()` throws, the exception is ignored when %ignoreInnerException is true.
Effects | May read and write memory, may throw or execute.

### UnreachableInst

UnreachableInst | _
--- | --- |
Description | Crashes the VM (ifndef NDEBUG).
Example |  %0 = UnreachableInst
Arguments | None.
Semantics | Can be added to stubs and similar to verify that they are never executed.
Effects | Marked as reading/writing memory to avoid reordering.

### HBCGetGlobalObjectInst

HBCGetGlobalObjectInst | _
--- | --- |
Description | Obtain the "global" object
Example |  %0 = HBCGetGlobalObjectInst
Arguments | None.
Semantics | The instruction returns a reference to the "global" object.
Effects | Does not read or write to memory.

### HBCCreateFunction

HBCCreateFunction | _
--- | --- |
Description | Create a new closure capturing the specified environment and using the specified body
Example | %0 = HBCCreateFunction %environment, %body,
Arguments | %environment is the closure's environment. %body is the closure's body.
Semantics | The instruction creates a new closure that may access the specified environment.
Effects | Does not read or write to memory.

### HBCCreateGenerator

CreateGenerator | _
--- | --- |
Description | Constructs a new Generator into the current scope from its code representation.
Example | %0 = CreateGenerator %environment, %body,
Arguments | %environment is the closure's environment, %body is the closure's body.
Semantics | The instruction creates a new GeneratorInnerFunction access the environment and wraps it in a Generator.
Effects | Does not read or write to memory.

### HBCAllocObjectFromBufferInst

HBCAllocObjectFromBufferInst | _
--- | --- |
Description | Allocates a new JavaScript object on the heap, and initializes it with values from the object buffer.
Example |  %0 = HBCAllocObjectFromBufferInst %value0, %value1, ...
Arguments | The values are all literal values, with alternating keys and values. Non-literal values will be inserted into the array separately.
Semantics | The instruction creates a new JavaScript object on the heap with an initial list of properties.
Effects | Does not read or write to memory.

### HBCCallNInst

HBCCallNInst | _
--- | --- |
Description | Calls a function with a fixed number of arguments (from 1 to 4, inclusive).
Example | %0 = HBCCallNInst %callee, %this, %arg0, %arg1, %arg2
Arguments | %callee is the function to execute. %this is a reference to the 'this' value. Arguments %arg0 ... %argN are the arguments passed to the function.
Semantics | The instruction copies its arguments (starting from this) into the parameter-passing registers at the end of the frame, and passes the control to the callee, which must be of closure type. The arguments are mapped to the parameters. Unmapped parameters are initialized to 'undefined'.
Effects | May read and write memory.
"""


class Entry:
    """Single entry for an IR instruction"""

    def __init__(self, name, description, example, arguments, semantics, effects):
        self.name = name
        self.description = description
        self.example = example
        self.arguments = arguments
        self.semantics = semantics
        self.effects = effects

    def tooltip(self):
        return self.description.replace('"', '\\"')

    def html(self):
        html_str = "<p>"
        html_str += "</p><p>".join(
            [
                self.description,
                self.example,
                self.arguments,
                self.semantics,
                self.effects,
            ]
        )
        html_str += "</p>"
        return html_str.replace('"', '\\"')


def parseEntry(lines, cur_idx):
    l = lines[cur_idx]
    instName = l[4:]
    # Three lines for blank line, name, and weird pipe things
    cur_idx += 4
    entry = Entry(
        instName,
        lines[cur_idx][len("Description | ") :],
        lines[cur_idx + 1][len("Example | ") :],
        lines[cur_idx + 2][len("Arguments | ") :],
        lines[cur_idx + 3][len("Semantics | ") :],
        lines[cur_idx + 4][len("Effects | ") :],
    )
    return cur_idx + 5, entry


def header():
    return r"""import {AssemblyInstructionInfo} from '../base.js';

export function getAsmOpcode(opcode: string | undefined): AssemblyInstructionInfo | undefined {
    if (!opcode) return;
    switch (opcode.toUpperCase()) {"""


def switchcase(label, html, tooltip, url):
    return (
        r"""
        case "AAAAA":
            return {
                "html": "BBBBB",
                "tooltip": "CCCCC",
                "url": "https://www.felixcloutier.com/x86/AAA.html"
            };""".replace(
            "AAAAA", label
        )
        .replace("BBBBB", html)
        .replace("CCCCC", tooltip)[1:]
    )


def footer():
    return r"""
        }
}"""[
        1:
    ]


def codeGenCases(entries):
    for e in entries:
        print(switchcase(e.name.upper(), e.html(), e.tooltip(), ""))


def codeGen(entries):
    print(header())
    codeGenCases(entries)
    print(footer())


lines = md.split("\n")


def __main__():
    i = 0
    entries = []
    while i < len(lines):
        l = lines[i]
        if l.startswith("### "):
            i, entry = parseEntry(lines, i)
            entries.append(entry)
            continue
        i += 1
    codeGen(entries)


__main__()
