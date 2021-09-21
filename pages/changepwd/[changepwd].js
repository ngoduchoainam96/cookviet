import fire from '../../config/fire-conf';

function updatePassword()
{
    function promptForCredentials() {
        return {};
      }
    const user = fire.auth().currentUser;

    // TODO(you): prompt the user to re-provide their sign-in credentials
    const credential = promptForCredentials();
  
    user.reauthenticateWithCredential(credential).then(() => {
      // User re-authenticated.
    }).catch((error) => {
      // An error ocurred
      // ...
    });
    return(
        <div>
            
        </div>
    )
}
export default updatePassword