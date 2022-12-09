import {useState,useRef} from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import {verifyToken} from "./api/recaptcha";

function App() {
    const [first_name,setFirstName] = useState("");
    const [last_name,setLastName] = useState("");
    const [message, setMessage] = useState("");
    const [error,setError] = useState("");
    const captchaRef = useRef(null);

    const handleSubmit = async e => {
        e.preventDefault();
        setError('');
        setMessage('');
        if(first_name && last_name){
            let token = captchaRef.current.getValue();
            if(token){
                let valid_token = await verifyToken(token);
                if(valid_token.success){
                    setMessage("Hurray!! you have submitted the form");
                }else{
                    setError("Sorry!! Token invalid");
                }
            }else{
                setError("You must confirm you are not a robot");
            }
        }else{
            setError("First name and Last name are required");
        }
    }

    return (
        <main>
            <h1 className="text-3xl font-bold underline">
                React Recaptcha!
            </h1>
            {
                error && <p className='text-red-500'>Error!! {error}</p>
            }
            {
                message && <p className='text-green-500'>Success!! {message}</p>
            }
            <form className="p-2 mt-2 flex flex-col justify-center items-center" onSubmit={handleSubmit}>
                <div className='w-96 mb-2'>
                    <label className="block mb-2">First Name</label>
                    <input className="w-full border border-purple-600 px-2 py-2 rounded outline-none" type="text" name="first_name" placeholder='Enter your first name' onChange={e => setFirstName(e.target.value)} />
                </div>
                <div className='w-96 mb-2'>
                    <label className="block mb-2 w-full w-max-96">Last Name</label>
                    <input  className="w-full border border-purple-600 px-2 py-2 rounded outline-none" type="text" name="last_name" placeholder='Enter your last name' onChange={e => setLastName(e.target.value)} />
                </div>
                <div className='w-96 mb-2'>
                    <button className="w-full inline-block bg-purple-500 text-white px-4 py-2 rounded" type="submit">Submit</button>
                </div>
                <ReCAPTCHA sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef}  />
            </form>
        </main>
    );
}
export default App;
