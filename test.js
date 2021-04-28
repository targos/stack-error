import { LoremIpsum } from 'lorem-ipsum';

import StackError from './src/stack-error.js';

function test(message) {
  console.log(new StackError(message));
}

test('');
test('A');
test('A B');
test('A B C');
test('A B C D E F G H I J K L M N O P Q R S T U V W X Y Z');
test('A  B');
test('HU " HU');
test(new LoremIpsum().generateWords(100));
