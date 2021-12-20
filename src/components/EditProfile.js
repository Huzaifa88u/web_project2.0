import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Field from "./Field";

export default function EditProfile() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const history = useHistory();
    const editProfile = [
        ["text", "name", "name", setName],
        ["email", "email", "Email", setEmail],
        ["password", "password", "Password", setPassword],
        ["number", "phoneNumber", "PhoneNumber", setPhoneNumber],
    ];

    return (
        <div className="parent">
            <div className="wrapper ">

                <div className="text-center mt-4 name "></div>
                <form className="p-3 mt-3">
                    {editProfile.map((ep, i) => (
                        <Field
                            key={i}
                            type={ep[0]}
                            name={ep[1]}
                            id={ep[1]}
                            placeholder={ep[2]}
                            onChange={(event) => ep[3](event.target.value)}
                        />
                    ))}
                    <Button color="primary" type="submit">
                        Edit
                    </Button>
                </form>
            </div>
        </div>
    )
};