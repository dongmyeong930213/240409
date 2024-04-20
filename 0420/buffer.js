/**
 * Buffer 란
 * 파일을 읽어들이는 방법 중 하나
 * 버퍼링은 파일을 준비하는 과정으로 생각하면 된다.
 * 버퍼는 최소한의 데이터를 모아놓는 장소
 * 읽는 시간이 길어지면 우리는 버퍼링 걸렸다 얘기함
 * spinner 등을 이용해서 버퍼링 중임을 알려주기도 한다.
 */


/**
 * Buffer에 사용되는 method
 * alloc() 빈 버퍼를 생성
 * tostring() 버퍼를 문자열로 변환
 * from() 문자열을 버퍼로 변경한다
 * 
 */

// 파일모듈을 이용해서 파일을 읽어오고 버퍼에 들어간 것을 확인할 수 있다. 

// const fs= require('fs'); //fs = 파일모듈
// const data = fs.readFileSync("./demo.txt");
// console.log(data);

// 버퍼의 크기를 할당 *alloc()

// const emptyBuffer = Buffer.alloc(15) // 10바이트 = 10글자
// console.log(emptyBuffer);


// 문자열을 버퍼로   * from / *toString = 문자로 변환

const strBuffer = Buffer.from('Hello world')
console.log(strBuffer);
console.log(strBuffer.toString());
