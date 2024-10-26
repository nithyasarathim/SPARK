function getCookie(name)
{
    const nameEQ=name+"=";
    const ca=document.cookie.split(';');
    for(let i=0;i<ca.length;i++)
    {
        let c=ca[i];
        while(c.charAt(0)==' ') c=c.substring(1,c.length);
        if(c.indexOf(nameEQ)==0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function deleteCookie(name)
{
    document.cookie=name+"=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

const userDataCookie=getCookie('userData');

if(!userDataCookie)
{
    window.location.href='login.html';
}
else
{
    const userData=JSON.parse(userDataCookie);
    document.getElementById('user-info').innerText=`Logged in as: ${userData.email}\nLeetCode Username: ${userData.leetcodeUsername}\nCodeChef Username: ${userData.codechefUsername}`;
}

document.getElementById('logoutBtn').addEventListener('click',function(){
    deleteCookie('userData');
    window.location.href='login.html';
});
