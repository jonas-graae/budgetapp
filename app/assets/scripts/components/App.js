import "../../styles/globals.scss";
import jonas from "../../images/1517065706367.jpeg";
import Sprites from "./sprites";



const App = () => {
    return (
        <div>
            <Sprites />
            <section className="hero">
            
            </section>

            <main>
                <h1>Oh Hai, React</h1>
                <img src={jonas}/>
                <a href="https://www.facebook.com/jonasgraae.rasmussen/">
                    <svg className="logo">
                        <use href={"#twitter"}/>
                    </svg>
                </a>
            </main>
        </div>
    )
}

export default App;