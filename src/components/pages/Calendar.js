import React, { useState, useEffect } from "react";
import "./Calendar.css"; // Подключаем стили

function Calendar() {
    const [data, setData] = useState({
        date: new Date().toISOString().split("T")[0],
        calories: 0,
        protein: 0,
        fat: 0,
        carbs: 0,
        water: 0,
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("nutritionData"));
        if (savedData && savedData.date === new Date().toISOString().split("T")[0]) {
            setData(savedData);
        }
    }, []);

    return (
        <div className="calendar-wrapper">
            <h2>Test Content (Scroll Down ⬇️)</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis aliquet turpis nec neque tincidunt, eu euismod velit tempor.</p>
            <p>Vivamus eget orci eget tortor gravida dictum. Morbi aliquet odio nec urna pellentesque, a imperdiet libero consequat.</p>
            <p>Sed commodo nisi sit amet felis accumsan, nec dictum erat tincidunt. Etiam nec tincidunt turpis. Fusce volutpat congue leo.</p>
            <p>Aliquam erat volutpat. Suspendisse vel nisl sem. Sed ultricies erat id libero dictum, a consequat felis fringilla.</p>
            <p>Morbi malesuada neque nec sapien feugiat, ut volutpat turpis lacinia. Duis euismod felis id urna faucibus.</p>
            <p>Pellentesque nec orci a nisi efficitur luctus. Nulla id velit ligula. Etiam et tristique ligula, eget tempor orci.</p>
            <p>Fusce scelerisque justo at lorem dapibus, at vulputate dui euismod. Sed sagittis erat in enim dapibus, sed volutpat erat tincidunt.</p>
            <p>Duis consequat felis eget turpis malesuada, nec laoreet lacus lacinia. Morbi sed dolor a magna ultrices aliquet.</p>
            <p>Integer a justo in dui accumsan interdum. Vestibulum dictum, metus non ultricies aliquet, ligula eros dapibus elit.</p>
            <p>Sed euismod nisi a lectus tincidunt, sed euismod nisi congue. Vivamus auctor ligula et sapien tincidunt.</p>
            <p>Nam sagittis nisl nec augue molestie, eget vehicula odio viverra. Phasellus ullamcorper libero id orci dictum.</p>
            <p>Maecenas id elit ac odio blandit convallis. In pharetra odio ut nisl tristique, sit amet tempor metus rhoncus.</p>
            <p>Vestibulum volutpat purus et libero interdum, ac aliquet mi cursus. Etiam id magna a dolor ultrices interdum.</p>
            <p>Quisque at lorem sed risus tincidunt condimentum. Duis dictum risus eu enim tempus, ut euismod magna fermentum.</p>
            <div className="bottom-space"></div>
        </div>
    );
}

export default Calendar;