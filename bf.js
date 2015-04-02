;(function() {
  'use strict';

  /* PAGE SETUP */
  var exe      = document.getElementById('exe');
  var codeText = document.getElementById('code');

  var stdin  = document.getElementById('stdin');
  var stdout = document.getElementById('stdout');


  /* MEMORY CELLS */
  var mBuffer = new ArrayBuffer(30000);
  var mem     = new Uint8Array(mBuffer);

  /* POINTER */
  var p = 0;

  /* PROGRAM CODE */
  var code;

  /* IO */
  var getChar = function() {
    console.log(stdin.value[stdin.value.length - 1]);
  };

  var putChar = function(idx) {
    stdout.value += String.fromCharCode(idx);
  };

  /* COMMANDS
   * > increment pointer
   * < decrement pointer
   * + increment byte
   * - decrement byte
   * . put byte as char
   * , get char
   * [ start loop until byte at pointer is 0
   * ] end loop, jump back to matching [
   * */

  /* EXECUTION */
  var index;
  var loopStart;

  exe.addEventListener('click', function(e) {
    /* INIT */
    code = codeText.value;
    index = 0;
    loopStart = [];

    while(index < code.length) {
      step(code[index]);
    }

  }, false);

  var step = function(op) {
    switch (op) {
      case '>':
        p++;
        index++;
        break;
      case '<':
        p--;
        index++;
        break;
      case '+':
        mem[p]++;
        index++;
        break;
      case '-':
        mem[p]--;
        index++;
        break;
      case '.':
        putChar(mem[p]);
        index++;
        break;
      case ',':
        var c = getChar();
        mem[p] = c;
        index++;
        break;
      case '[':
        loopStart.push(index);
        index++;
        break;
      case ']':
        if (mem[p]) {
          index = loopStart.pop();
        } else {
          loopStart.pop();
          index++;
        }
        break;
      default:
          index++;
    }
  };




}());
