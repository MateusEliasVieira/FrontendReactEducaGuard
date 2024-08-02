import axios from "axios";
import "./Password.css";
import {useState} from "react";
import Modal from "../modal/Modal.jsx";

const PasswordInput = (props) => {

    const [pass, setPass] = useState('');
    const [passConfirm, setPassConfirm] = useState('');
    const [displayModal, setDisplayModal] = useState("none");
    const [titleModal, setTitleModal] = useState("");
    const [contentModal, setContentModal] = useState("");

    const showModal = (titulo, conteudo) => {
        setDisplayModal("block");
        setTitleModal(titulo);
        setContentModal(conteudo);
    };

    const hideModal = () => {
        setDisplayModal("none");
        setTitleModal("");
        setContentModal("");
    };


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
                            showModal("Aviso",response.data.message);
                        } else {
                            showModal("Aviso","Erro ao recuperar a conta!");
                        }
                    } catch (err) {
                        console.log("Err "+err)
                        showModal("Aviso",err);
                    }
                } else {
                    showModal("Aviso","A URL está quebrada!");
                }
            } else {
                showModal("Aviso","As senhas não são as iguais!");
            }
        } else {
            showModal("Aviso","Preencha os campos!");
        }
    };

    return (
        <div>
            <Modal
                dsp={displayModal}
                title={titleModal}
                content={<div dangerouslySetInnerHTML={{__html: contentModal}}/>}
                setContentModal={setContentModal}
                hideModal={() => hideModal(setDisplayModal, setTitleModal, setContentModal)}
            />

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
