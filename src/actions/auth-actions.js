
export const LOGIN = "login";
export const LOGOUT = "logout";


//Authentication & Login & Logout
export function login(loginData, navigationCallback) {

//used logins admin, admin1, admin2 ...@admin.com // (password Admin1!)
    // loginData = {
    //     Password: "Admin1!",
    //     ConfirmPassword: "Admin1!",
    //     Email: "admin2@admin.com"
    // }

    // axios.post(`http://localhost:64850/api/Account/Register`, loginData)
    // .then(response => console.log(response));

    //axios.post('http://localhost:64850/token', {Email: "admin2@admin.com", Password: "Admin1!"});

    // axios({
    //     method: "POST",
    //     headers: {"Content-Type": 'application/x-www-form-urlencoded'},
    //     url: "http://localhost:64850/token",
    //     data: qs.stringify({UserName: "admin1@admin.com", Password: "Admin1!", grant_type: "password"})
    // })
    console.log("loggingIn", loginData);
    sessionStorage.setItem("userInfo", JSON.stringify(loginData));
    if (navigationCallback)
        navigationCallback();
    return {
        type: LOGIN,
        payload: loginData
    }
}

export function logout(navigationCallback) {
    if (navigationCallback)
        navigationCallback();
    sessionStorage.clear();

    return {
        type: LOGOUT,
    }

}


