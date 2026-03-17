1️⃣ What is the difference between var, let, and const?

Ans : var , let and const , these three are used to declare variables in javascript .

var is an old way and it is functional scoped which means its scope is limited to the function , not in a block. Which can lead to unexpected bug. also var is hoisted and initialized with undefined, which can lead to unexpected behavior.

On the other side let and const are block scoped which means if it is declared in a block , it can't be accesssable outside of the block.

let is used when there is a need of changing the value of the variable in future. const is used when there is no need of changing the value of the variable.But if we declare an object or an array , we can change the data inside of the array or object, but we can't reassign it. In modern development const is used as default , let is used when it is needed and avoid using var

Var can be redeclared but let/const can not. means if we do 

var a = 10
var a = 50

there will be no error it will redeclare. but if we do the same thing using let/const , it won't allow.

2️⃣ What is the spread operator (...)?

Ans : Spread operator is used to get all the data of an array or an object individually . It is mainly used for copying , merging or updating data. In javascript when we assign an array or object directly it actually copies the reference. so when a change is made on one , the other will also change. But we can prevent this using spread operator.

3️⃣ What is the difference between map(), filter(), and forEach()?

Ans : All are methods but works differently.

map() is used to create a new array by changing every elements of the existing array. It is mostly used to rendering list in UI or data transform.

filter() is used to filter an array by following a condition. It returns a new array with only those elements which passed the condition.

forEach() is used to loop on an array. It doesn't return a new array.

4️⃣ What is an arrow function?

Ans : Arrow function is a modern way to writing functions in javascript. It is easier and contains less code writing than traditional javascript function

But arrow function does not have it's own this. It takes this from its parent , the one who called the arrow function. Arrow function is mostly used in callback functions like map(), filter(), addEventListener()

5️⃣ What are template literals?

Ans : Template literals is a way of writing string in javascripting using backtick (`). The main advantage is we can use ${} to write variable or expression which makes string concatenation easier. We an also write multi line string so creating HTML structure becomes easier. It is mostly used in UI rendering which makes code cleaner and improves readability 
