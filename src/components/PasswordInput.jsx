import axios from "axios";
import "./Password.css";
import {useState} from "react";

const PasswordInput = (props) => {
    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');

    const handleClick = async () => {
        if (pass !== "" && passConfirm !== "") {
            if (pass === passConfirm) {
                if (props.token) {
                    try {
                        const response = await axios.post(
                            "https://educaguard.up.railway.app/api/recover/new-password",
                            {
                                token: props.token,
                                newpassword: pass
                            },
                            {
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        );

                        if (response.status === 200) {
                            alert(response.data.message);
                        } else {
                            alert("Erro ao recuperar a conta!");
                        }
                    } catch (err) {
                        console.log("Erro " + err.message);
                        alert("Falha ao realizar recuperação de conta!");
                    }
                } else {
                    alert("A URL está quebrada!");
                }
            } else {
                alert("As senhas não são as mesmas!");
            }
        } else {
            alert("Preencha os campos!")
        }
    };

    return (
        <div>
            <input className="form-control form-control-lg" type="password" placeholder="Nova senha"
                   aria-label=".form-control-lg example" value={pass} onChange={(e) => setPass(e.target.value)}/>
            <input className="form-control form-control-lg" type="password" placeholder="Confirme a nova senha"
                   aria-label=".form-control-lg example" value={passConfirm}
                   onChange={(e) => setPassConfirm(e.target.value)}/>
            <button className="btn btn-primary" onClick={handleClick}>Recuperar</button>
        </div>
    );
}

export default PasswordInput;
