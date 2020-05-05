import React, { useState, useEffect } from "react";
import * as yup from "yup";
import axios from "axios";

export default function Pizza() {
  const [post, setPost] = useState([]);
  // managing state for our form inputs
  const [formState, setFormState] = useState({
    name: "",
    specialinstructions: "",
    pizzasize: "",
    pizzasauce: "",
    pep: false,
    onions: false,
    olives: false,
    peppers: false,
    nothing: false
    
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [errors, setErrors] = useState({
    name: "",
    specialinstructions: "",
    pizzasize: "",
    pizzasauce: "",
    pep: "",
    onions: "",
    olives: "",
    peppers: "",
    nothing: ""
  });

  const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    specialinstructions: yup.string().required("Please enter instructions here or N/A for no instructions"),
    pep: yup.boolean().oneOf([true, false], "please pick a topping"),
    onions: yup.boolean().oneOf([true, false], "please pick a topping"),
    olives: yup.boolean().oneOf([true, false], "please pick a topping"),
    peppers: yup.boolean().oneOf([true, false], "please pick a topping"),
    nothing: yup.boolean().oneOf([true, false], "please pick a topping"),
    pizzasize: yup.string(),
    pizzasauce: yup.string()
  });

  const validateChange = e => {
    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch(err => {
        console.log("error!", err);
        setErrors({ ...errors, [e.target.name]: err.errors[0] });
      });
  };

  console.log("error state", errors);
  useEffect(() => {
    formSchema.isValid(formState).then(valid => {
      console.log("valid?", valid);
      setIsButtonDisabled(!valid);
    });
  }, [formState]);

  // onSubmit function
  const formSubmit = e => {
    e.preventDefault();
    axios
      .post("https://reqres.in/api/users", formState)
      .then(response => {
        setPost(response.data);
        setFormState({
          name: "",
          specialinstructions: "",
          pizzasize: "",
          pizzasauce: "",
          pep: "",
          onions: "",
          olives: "",
          peppers: "",
          nothing: ""
        });
      })
      .catch(err => console.log(err.response));
  };

  // onChange function
  const inputChange = e => {
    console.log("input changed!", e.target.value);
    e.persist();
    const newFormData = {
      ...formState,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
    validateChange(e);
    setFormState(newFormData);
  };

  return (
    <form onSubmit={formSubmit}>
      <label htmlFor="name">
        Name
        <input
          id="name"
          type="text"
          name="name"
          onChange={inputChange}
          value={formState.name}
          data-cy="name"
        />
        {errors.name.length > 0 ? <p className="error">{errors.name}</p> : null}
      </label>
      
      <label htmlFor="specialinstructions">
        Do you have any special instructions?
        <textarea
          name="specialinstructions"
          onChange={inputChange}
          value={formState.specialinstructions}
          data-cy="specialinstructions"
        />
        {errors.specialinstructions.length > 0 ? (
          <p className="error">{errors.specialinstructions}</p>
        ) : null}
      </label>

      <label htmlFor="pizzasize">
        What size of pizza?
        <select id="pizzasize" name="pizzasize" onChange={inputChange}>
          <option value="small">small</option>
          <option value="medium">medium</option>
          <option value="large">large</option>
        </select>
      </label>

      <label htmlFor="pizzasauce">
        What kind of sauce?
        <select id="pizzasauce" name="pizzasauce" onChange={inputChange}>
          <option value="Original Red">Original Red</option>
          <option value="Garlic Ranch">Garlic Ranch</option>
          <option value="BBQ">BBQ</option>
        </select>
      </label>

      <label htmlFor="switch">
        Gluten Free?
        <input type="checkbox"/>
        <span class="slider round"></span>
      </label>

        Any toppings?
      <label htmlFor="pep" className="pep">
        <input
          type="checkbox"
          name="pep"
          checked={formState.pep}
          onChange={inputChange}
        />
        pep
      </label>

      <label htmlFor="onions" className="onions">
        <input
          type="checkbox"
          name="onions"
          checked={formState.onions}
          onChange={inputChange}
        />
        onions
      </label>

      <label htmlFor="olives" className="olives">
        <input
          type="checkbox"
          name="olives"
          checked={formState.olives}
          onChange={inputChange}
        />
        olives
      </label>

      <label htmlFor="peppers" className="peppers">
        <input
          type="checkbox"
          name="peppers"
          checked={formState.peppers}
          onChange={inputChange}
        />
        peppers
      </label>

      <label htmlFor="nothing" className="nothing">
        <input
          type="checkbox"
          name="nothing"
          checked={formState.nothing}
          onChange={inputChange}
        />
        none
      </label>

      <pre htmlFor="Add to Order" className="Add to Order"
        data-cy="Add to Order">
        {JSON.stringify(post, null, 2)}
        </pre>

      <button disabled={isButtonDisabled} type="Add to Order">
        Add to Order
      </button>
    </form>
  );
}
