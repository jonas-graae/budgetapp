import "../../styles/globals.scss";
import jonas from "../../images/1517065706367.jpeg"
import facebook from "../../images/facebook.svg";
import placeholder from "../../images/placeholder.svg";


const App = () => {
    return (
        <div>
            <section className="hero">
            
            </section>
            <main>
                <h1>Oh Hai, React</h1>
                <img src={jonas}/>
                <a href="https://www.facebook.com/jonasgraae.rasmussen/">
                    <img src={placeholder}/>
                </a>
            </main>
        </div>
    )
}

export default App;