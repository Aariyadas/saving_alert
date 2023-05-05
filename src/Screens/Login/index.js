import React from "react";
import { Button, Form, Input, Radio, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../apicalls/userApi";


const Login = () => {
  const [type, setType] = React.useState("donar");
  const navigate =useNavigate()
  const onFinish= async(values)=>{
    console.log(values)
    try{
        const response =await LoginUser(values)
        if(response.success){
            message.success(response.message)
            localStorage.setItem("token",response.data)
            navigate("/")
        }else{
            throw new Error(response.message)
        }

    }catch(error){
        message.error(error.message)
    }
  }
  return (
    <div className="flex h-screen items-center justify-center bg-primary">
      <Form
        layout="vertical"
        className="bg-white rounded shadow  p-5 gap-5 w-1/3 "
        onFinish={onFinish}
     >
        <h1 className="col-span-2 uppercase text-2xl ">
          <span className="text-primary item-center">
            {type.toUpperCase()}-Login
          </span>
        </h1>

        <Radio.Group
          onChange={(e) => setType(e.target.value)}
          value={type}
          className="col-span-2"
        >
          <Radio value="donar">Donar</Radio>
          <Radio value="hospital">Hospital</Radio>
          <Radio value="organization">Organization</Radio>
        </Radio.Group>
     
          <>
      
            
            <Form.Item label="Email" name='email'>
              <Input  type='email'/>
            </Form.Item>
          
            <Form.Item label="Password" name='password'>
              <Input  type='password'/>
            </Form.Item>
          </>
    
       
        <Button className="bg-primary hover:bg-primary-700 block" htmlType="submit">
          Login
        </Button>

        <Link
          to="/register"
          className="col-span-2 text-center text-gray-700 underline"
        >
          Don't have an account? Register
        </Link>
      </Form>
    </div>
  );
};

export default Login;
