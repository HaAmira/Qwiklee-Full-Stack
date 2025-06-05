const forgotPasswordTemplet = ({name, otp})=>{
    return `
    <div>
        <p>Dear, ${name}</p>
        <p>You're requested a password reset. Please use following OTP code to reset your password.</p>
        <div style="background: yellow; padding: 5px; font-size: 25px; font-weight: 600; text-align: center;">
            ${otp}
        </div>
        <p>This otp is valide for 1 hours only. Enter this otp in the binkeyit website to proceed with resetting your password.</p>
        <br>
        </br>
        <p>Thanks</p>
        <p>Binkeyit</p>
    </div>
    `
}

export default forgotPasswordTemplet
