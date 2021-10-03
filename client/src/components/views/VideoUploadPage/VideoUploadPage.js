import { Button, Form, Icon, Input, message, Select, Typography } from 'antd'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

const {TextArea} = Input;
const {Title} = Typography;

const PrivateOption = [
    {value:0, label: "Private"},
    {value: 1, label: "Public"}
]
const CategoryOption = [
    {value: 0, label: "Film & Animation"},
    {value: 1, label: "Autos & Vehicles"},
    {value: 2, label: "Music"},
    {value: 3, label: "Pets & Animals"},
]
function VideoUploadPage() {

    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const onTitleChange = (e) => {
        setVideoTitle(e.target.value)
    }
    const onDescriptionChange = (e) => {
        setDescription(e.target.value)
    }
    const onPrivateChange = (e) => {
        setPrivate(e.target.value)
    }
    const onCategoryChange = (e) => {
        setCategory(e.target.value)
    }

    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            

                <Form onSubmit>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Dropzone
                    onDrop
                    multiple
                    maxSize>
                    {({getRootProps, getInputProps, }) => (
                        <div style={{width:'300px', height: '240px', display:'flex',border:'1px solid lightgray', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem'}} />
                        </div>

                    )}
                    </Dropzone>
                  {/* thumnail */}
                    <div>
                        <img src alt></img>
                    </div>

                </div>
                </Form>

                <br/><br/>
                <div>
                    <Title level={4}>Title</Title>
                    <Input 
                        onChange={onTitleChange}
                        value={VideoTitle}
                    />
                    <Title level={4}>Description</Title>
                    <TextArea 
                        onChange={onDescriptionChange}
                        value={Description}
                    
                    />
                    
                </div>
                <br/>
                <div>
                        <select onChange={onPrivateChange}>
                            {
                                PrivateOption.map((item, index) => (
                                <option key={index} value={item.value}>{item.label}</option> 
                                ))
                            }
                        
                        </select> <br/><br/>
                        <select onChange={onCategoryChange}>
                            {
                            CategoryOption.map((item, index)=> (
                              <option key={index} value={item.value}>{item.label}</option>
                            ))
                            }
                        </select> <br/><br/>
                </div>
                <Button>Submit</Button>

           
        </div>
    )
}

export default VideoUploadPage
