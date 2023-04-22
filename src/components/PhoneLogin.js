import { useState } from "react";
import { auth } from ".//firebase";
import InputControl from "./InputControl";
import styles from "./login.module.css";
function PhoneLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const credential = auth.PhoneAuthProvider.credential(null, password);
      await auth().signInWithPhoneNumber(phoneNumber, credential);
      console.log('Successfully logged in!');
    } catch (error) {
      console.error(error);
      setError('Incorrect phone number or password');
    }
  };

  const handleSetPassword = async () => {
    try {
      const user = auth().currentUser;
      if (!user) {
        setError('User not signed in');
        return;
      }

      await user.updatePassword(password);
      console.log('Successfully set password!');
      handleLogin();
    } catch (error) {
      console.error(error);
      setError(error.message || 'Failed to set password. Please try again.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.innerBox}>
        <h1 className={styles.heading}>Phone Login</h1>
      <InputControl
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.target.value)}
      />
      <InputControl
      
        type="password"
        placeholder="Password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
       <div className={styles.footer}>
      <button onClick={handleSetPassword}>Set Password</button>
      <button onClick={handleLogin}>Login</button>
      <b className= {styles.error}>{error && <p>{error}</p>}</b>
      </div>
    </div>
    </div>
  );
}
export default PhoneLogin;