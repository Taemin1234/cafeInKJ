let url =
  "https://apis.data.go.kr/5050000/eatHtpService/getEatHtp?serviceKey=IPfiPUiaF2TbLeMTLv3jVY8Y9jd0qlTgatibFbJgnrLxC0dGNMsMLsUPZxO01RVuUeEeUFa%2BauUwSeg4wiqaig%3D%3D&numOfRows=60";

fetch(url)
  .then((response) => response.json())
  .then((result) => {
    callFunc(result);
    tagControl();
    findCafe();
  })
  .catch((error) => {
    console.log("에러", error);
  });

//데이터 로드
// function callFunc(result) {
//   const obj = result.response.body.items.item;
//     // console.log(obj);

//     let cafeList = document.querySelector('.cafe-list')

//     obj.forEach((el,i) => {

//       // 자식요소 백틱 생성
//       const listItem = `
//         <li class="cafe-list-box">
//           <span class="keyword">${obj[i].AREA_NAME}</span>
//           <p class="store-name">${obj[i].CON_TITLE}</p>
//           <p class="store-cont">${obj[i].CON_CONTENT}</p>
//           <p class="store-address">${obj[i].CON_DESC1}</p>
//           <p class="store-phone">${obj[i].CON_DESC2}</p>
//         </li>
//       `;
//       //<img class="store-img" src="${obj[i].CON_IMGFILENAME}" alt="${obj[i].SRC_TITLE}">
//       cafeList.innerHTML += listItem
//     })

// }

function callFunc(result) {
  const obj = result.response.body.items.item;
  console.log(obj);

  let cafeList = document.querySelector(".cafe-list");

  let arrCafeList = obj.map((el, i) => {
    return `
        <li class="cafe-list-box">
          <span class="keyword">${obj[i].AREA_NAME}</span>
          <p class="store-name">${obj[i].CON_TITLE}</p>
          <div class="cont-wrap">
            <img class="store-img" src="http://${obj[i].CON_IMGFILENAME}" alt="${obj[i].SRC_TITLE}">
            <div>
              <p class="store-address">${obj[i].CON_DESC1}</p>
              <p class="store-phone">${obj[i].CON_DESC2}</p>
            </div>
          </div>
          
        </li>
      `;
    //이거 넣기
    // <p class="store-cont">${obj[i].CON_CONTENT}</p>

    // <img class="store-img" src="${obj[i].CON_IMGFILENAME}" alt="${obj[i].SRC_TITLE}">
    // cafeList.innerHTML += listItem
  });

  // 태그를 클릭했을 때 태그에 맞게 필터링해서 애초에 랜더링

  arrCafeList.forEach((el) => {
    cafeList.innerHTML += el;
  });
}

function tagControl() {
  let keywordTag = Array.from(document.querySelectorAll(".keyword_tag > span"));

  keywordTag.forEach((el) => {
    el.addEventListener("click", function () {
      this.classList.add("on");
      keywordTag.forEach(function (item) {
        if (item !== el) {
          item.classList.remove("on");
        }
      });
    });
  });
}

//로드된 데이터 중에서 찾기

//태그를 클릭했을 때 클릭한 태그의 글자를 찾고
// 카드의 keyword 글자를 찾는다.
// 태그의 글자와 나타나는 카드의 keyword가 다르면
// 화면에 보이지 않게 한다.
// 전제보기를 선택했다면 모든 카드가 보이게 한다.
function findCafe() {
  let cafeItem = Array.from(document.querySelectorAll(".cafe-list-box"));

  // 활성화된 태그 찾기
  let keywordTag = Array.from(document.querySelectorAll(".keyword_tag > span"));

  let tagOn = keywordTag.filter((tag) => {
    return tag.classList.contains("on");
  });
  //tagOn의 속성에서 내부 글자 추출
  let tagOnText = tagOn.map((tag) => tag.textContent);

  let arrCafeKeyW = [];

  cafeItem.forEach((el) => {
    // 랜더링된 요소의 키워드 뽑아내기
    let keyword = el.querySelector(".keyword").innerText;

    if (keyword == tagOnText) {
      return arrCafeKeyW.push;
    }
  });
}

// createElement 활용
//////////////////////////////////////////////
// for(let i = 0; i < obj.length; i++) {

//   let li = document.createElement('li')
//   li.setAttribute('class','cafe-list-box')

//   // 자식요소생성
//   let name = document.createElement('p')
//   let img = document.createElement('img')
//   let address = document.createElement('p')
//   let phone = document.createElement('p')
//   let cont = document.createElement('p')

//   name.setAttribute('class', 'store-name')
//   img.setAttribute('class', 'store-img')
//   //setAttribute는 이미지소스로 url을 설정할 수 없다.
//   img.setAttribute('src', obj[i].CON_IMGFILENAME)
//   address.setAttribute('class', 'store-address')
//   phone.setAttribute('class', 'store-phone')
//   cont.setAttribute('class', 'store-cont')

//   name.innerHTML = obj[i].CON_TITLE;
//   //src 속성을 활용해 이미지 url 설정
//   img.src = obj[i].CON_IMGFILENAME;
//   address.innerHTML = obj[i].CON_DESC1;
//   phone.innerHTML = obj[i].CON_DESC2;
//   cont.innerHTML = obj[i].SRC_TITLE;

//   //부모요소 안에 자식요소 내용넣기
//   li.appendChild(name)
//   li.appendChild(img)
//   li.appendChild(address)
//   li.appendChild(cont)

//   //HTML에 만든 요소 넣기
//   cafeList.appendChild(li)
// }

// https://wanttosleep1111.tistory.com/entry/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EB%B9%84%EB%8F%99%EA%B8%B0-%ED%86%B5%EC%8B%A0-Ajax%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%B4-%EC%98%81%ED%99%94%EC%A7%84%ED%9D%A5%EC%9C%84%EC%9B%90%ED%9A%8C-api-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%A0%91%EA%B7%BC-Java-Script-Asynchronous-communication-Ajax

// 카카오 맵을 통해 위치 인식
// https://blog.naver.com/PostView.naver?blogId=comingdown&logNo=222506415672&from=search&redirect=Log&widgetTypeCall=true&directAccess=false

//async await
// async function fetchData() {
//   try {
//     const response = await fetch(url3);
//     const result = await response.json();
//     const obj2 = result.response.body;
//     // const obj2 = result;
//     console.log(obj2);
//     console.log(obj2.items);
//     console.log(obj2.items.item[48].CON_TITLE);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData();
