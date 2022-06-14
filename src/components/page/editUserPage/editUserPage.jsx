import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { validator } from "../../../utils/validator";
import TextField from "../../common/form/textField";
import RadioField from "../../common/form/radioField";
import BackHistoryButton from "../../common/backButton";
import pictures from "../../../statics/images/images.png";
import { useQualities } from "../../../hooks/useQualities";
import { useProfessions } from "../../../hooks/useProfession";
import { useUser } from "../../../hooks/useUsers";
import SelectField from "../../common/form/selectField";
import MultiSelectField from "../../common/form/multiSelectField";
import { useAuth } from "../../../hooks/useAuth";

const EditUserPage = () => {
    const { userId, edit } = useParams();
    const { currentUser } = useAuth();
    const { updateUser } = useAuth();
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const { getUserById } = useUser();
    const { qualities } = useQualities();
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }));
    const { professions } = useProfessions();
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }));
    const user = getUserById(userId);
    const newUser = {
        ...user,
        qualities: user.qualities.map((q) => {
            for (let i = 0; i < qualitiesList.length; i++) {
                if (qualitiesList[i].value === q) return qualitiesList[i];
            }
            return q;
        })
    };
    const [dataUser, setDataUser] = useState(newUser);
    const [errors, setErrors] = useState({});

    document.body.style.backgroundImage = `url(${pictures})`;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        const newData = {
            ...dataUser
        };
        try {
            await updateUser(newData);
            history.push(`/users/${dataUser._id}`);
        } catch (error) {
            setErrors(error);
        }
    };

    useEffect(() => {
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (dataUser._id) setIsLoading(false);
    }, [dataUser]);

    const validatorConfig = {
        email: {
            isRequired: {
                message: "Электронная почта обязательна для заполнения"
            },
            isEmail: {
                message: "Email введен некорректно"
            }
        },
        name: {
            isRequired: {
                message: "Введите ваше имя"
            }
        }
    };
    useEffect(() => validate(), [dataUser]);

    const handleChange = (target) => {
        setDataUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validate = () => {
        const errors = validator(dataUser, validatorConfig);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
    const isValid = Object.keys(errors).length === 0;

    if (dataUser._id !== currentUser._id && edit === "edit") {
        history.push(`/users/${currentUser._id}`);
    };

    console.log("dataUser", dataUser);

    return (
        <>
             {!isLoading && Object.keys(qualities).length > 0
                ? <div className="container mt-5">
                    <BackHistoryButton/>
                    <div className="row">
                        <div className="col-md-6 offset-md-3 shadow p-4">
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={dataUser.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={dataUser.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    options={professionsList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={dataUser.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: "Male", value: "male" },
                                        { name: "Female", value: "female" },
                                        { name: "Other", value: "other" }
                                    ]}
                                    value={dataUser.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    defaultValue={dataUser.qualities}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                : "Loading..."
            }
        </>
    );
};

export default EditUserPage;
