// Firebase SDK 라이브러리 가져오기
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs, getDoc, query, where } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { deleteDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCDc7nItzYeo_WztV2j6PUdu0D7Ym6BlG8",
    authDomain: "sparta-c15eb.firebaseapp.com",
    projectId: "sparta-c15eb",
    storageBucket: "sparta-c15eb.appspot.com",
    messagingSenderId: "542890196894",
    appId: "1:542890196894:web:906326cb17a7a0b7a8608f",
    measurementId: "G-X0K0GGPQQB"
};
// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
$('#applicationbtn').click(async function () {
    let image = $('#image').val();
    let name = $('#name').val();
    let rank = $('#rank').val();
    let mbti = $('#mbti').val();
    let Advantages = $('#Advantages').val();
    let style = $('#style').val();
    let blog = $('#blog').val();
    let doc = {
        'image': image,
        'name': name,
        'rank': rank,
        'mbti': mbti,
        'Advantages': Advantages,
        'style': style,
        'blog': blog
    };
    await addDoc(collection(db, 'employees'), doc);
    alert('지원완료');
    window.location.reload();
})
$('#savebtn').click(async function () {
    $('#applicationbox').toggle();
})
let docs = await getDocs(collection(db, 'employees'));
docs.forEach((doc) => {
    let row = doc.data();
    let image = row.image;
    let name = row.name;
    let rank = row.rank;
    let temp_html = `
    <div class="col">
        <div class="card">
            <img src="${image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${name}</h5>
                <p class="card-text">${rank}</p>
                <button type="button" class="btn btn-danger"
                    style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">
                    삭제하기
                </button>
            </div>
        </div>
    </div>`;
    $('#card').append(temp_html);
});
var userId = new Array();
let i = 0;
const q = query(collection(db, "employees"));
const querySnapshot = await getDocs(q);
querySnapshot.forEach((doc) => {
    userId[i] = doc.id;
    i++;
});
console.log(userId[0]);
i = 0;
$('.btn').click(async function () {
    await deleteDoc(doc(db, "employees", userId[i]));
    alert('삭제완료');
    window.location.reload();
})