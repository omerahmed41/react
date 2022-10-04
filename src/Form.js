import {useState} from 'react';
import ReactDOM from 'react-dom/client';

function MyForm() {
    const [inputs, setInputs] = useState({});
    const [myCar, setMyCar] = useState("Volvo");

    const handleselectChange = (event) => {
        setMyCar(event.target.value)
    }
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }

    return (
        <form onSubmit={handleSubmit}>
            <textarea>
  Content of the textarea.
</textarea>
            <label>Enter your name:
                <input
                    type="text"
                    name="username"
                    value={inputs.username || ""}
                    onChange={handleChange}
                />
            </label>
            <label>Enter your age:
                <input
                    type="number"
                    name="age"
                    value={inputs.age || ""}
                    onChange={handleChange}
                />
            </label>
            <select value={myCar} onChange={handleselectChange}>
                <option value="Ford">Ford</option>
                <option value="Volvo">Volvo</option>
                <option value="Fiat">Fiat</option>
            </select>
            <input type="submit"/>
        </form>
    )
}


export default MyForm;