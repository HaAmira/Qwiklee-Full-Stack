const verifyEmailTemplate = ({name,url})=>{
    return`
    <p>Dear ${name}</p>
    <p>Tank you for registering Binkeyit.</p>
    <a href=${url} style="color: white; background: blue; margin-top: 10px; text-decoration: none; border-radius: 5px; padding: 5px; border: 2px solid black;">
        Verify Email
    </a>
    `
}

export default verifyEmailTemplate
