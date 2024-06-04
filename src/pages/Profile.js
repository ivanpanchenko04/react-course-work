import avatar from "../img/photo_2024-06-02_17-12-52.jpg";
import {useEffect} from "react";
import github from "../img/GitHub_Invertocat_Logo.svg.png";

export default function Profile() {
    useEffect(() => {
        document.title = 'Профіль';
    }, [])

    return (
        <div style={{marginTop: 25 + "px", fontFamily: + "My Font"}}>
            <img src={avatar} alt="Profile photo" width="150px" height="auto"/>
            <h3>Іван Панченко</h3>
            <p>Студент Черкаського державного технологічного університету. Начаюсь за фахом "Інформаційні системи
                та технології". Вивчаю вебпрограмування та вебдизайн</p>
            <a href="https://github.com/ivanpanchenko04">
                <img src={github} alt="GitHub" width="50px" height="auto"/>
            </a>
        </div>
    )
}
