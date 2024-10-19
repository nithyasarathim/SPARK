import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js";

const firebaseConfig={
    apiKey:"AIzaSyBmsjwNLq0LPzKyuh-8oi1hJDh6Vu_FyVo",
    authDomain:"spark-dataserver.firebaseapp.com",
    projectId:"spark-dataserver",
    storageBucket:"spark-dataserver.appspot.com",
    messagingSenderId:"557063328262",
    appId:"1:557063328262:web:2d89d0b64a012f59786987",
    measurementId:"G-JL7P874P73"
};
const app=initializeApp(firebaseConfig);
const auth=getAuth(app);
const db=getFirestore(app);

const login=document.getElementById('loginBtn');
const email=document.getElementById('email-login');
const pwd=document.getElementById('pwd-login');
const warn=document.getElementById('warn');

login.addEventListener('click',function(){
    if(email.value===''||pwd.value===''){
        warn.innerText='Please fill in all fields';
        warn.style.textAlign='center';
    }
    else if(pwd.value.length<8){
        warn.innerText=`It can't be valid password`;
        warn.style.textAlign='center';
    }
    else
    {
        loginUser(email.value,pwd.value);
    }

});
async function loginUser(email, password) {
    const auth = getAuth();
    try {
        warn.innerText='';
        warn.innerHTML='<img src="loading.gif" alt="loading" style="display:block;margin:auto;height:40px;width=40px">';
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        warn.innerHTML='';
        warn.innerText='Login successful';
        warn.style.textAlign='center';
        warn.style.color='green'; 
    } catch (error) {
        if(error.message==="Firebase: Error (auth/invalid-credential)."){
            warn.innerText='Invalid credentials';
            warn.style.textAlign='center';
        }
        else
        {
            warn.innerText=error.message;
            warn.style.textAlign='center';
        }
    }
}

document.getElementById('signup-trigger').onclick = () => window.location.href = 'index.html';