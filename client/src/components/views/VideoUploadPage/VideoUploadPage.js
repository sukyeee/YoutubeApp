import { Button, Form, Icon, Input, message, Select, Typography } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React from 'react'
import Dropzone from 'react-dropzone'
const {Title} = Typography;

function VideoUploadPage() {

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
                    <Input placeholder='true' />
                    <Title level={4}>Description</Title>
                    <TextArea 
                    placeholder='true'
                    />
                    
                </div>
                <br/>
                <div>
                        <Select >
                        <option key value>Private</option>
                        </Select> <br/><br/>
                        <Select >
                        <option key value></option>
                        </Select> <br/><br/>
                </div>
                <Button>Submit</Button>

           
        </div>
    )
}

export default VideoUploadPage
