import { Button, Form, Icon, Input, message, Select, Typography } from 'antd'
import Axios from 'axios';
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { useSelector } from 'react-redux';


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



function VideoUploadPage(props) {
    const user = useSelector(state => state.user)
    const [VideoTitle, setVideoTitle] = useState("")
    const [Description, setDescription] = useState("")
    const [Private, setPrivate] = useState(0)
    const [Category, setCategory] = useState("Film & Animation")

    const [FilePath, setFilePath] = useState("")
    const [Thumbnail, setThumbnail] = useState("")
    const [Duration, setDuration] = useState("")

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
    const onDrop = (files) => {
        let formData = new FormData;
        const config = {
            header: {'content-type': 'multipart/form-data'}
        }
        formData.append("file",files[0])
        console.log(files)
    
        Axios.post('/api/video/uploadfiles', formData, config)
                .then(response => {
                    if (response.data.success) {
    
                        let variable = {
                            url: response.data.url,
                            fileName: response.data.fileName
                        }
                        console.log(response.data)
                        setFilePath(response.data.url)
    
                        //gerenate thumbnail with this filepath ! 
    
                        Axios.post('/api/video/thumbnail', variable)
                            .then(response => {
                                if (response.data.success) {
                                    setDuration(response.data.fileDuration)
                                    setThumbnail(response.data.url)
                                } else {
                                    alert('Failed to make the thumbnails');
                                }
                            })
    
    
                    } else {
                        alert('failed to save the video in server')
                    }
                })
    }

    const onSubmit = (event) => {

        event.preventDefault();

        // if (user.userData && !user.userData.isAuth) {
        //     return alert('Please Log in First')
        // }

        // if (title === "" || Description === "" ||
        //     Categories === "" || FilePath === "" ||
        //     Duration === "" || Thumbnail === "") {
        //     return alert('Please first fill all the fields')
        // }

        const variables = {
            writer: user.userData._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            filePath: FilePath,
            category: Category,
            duration: Duration,
            thumbnail: Thumbnail
        }

        Axios.post('/api/video/uploadVideo', variables)
            .then(response => {
                if (response.data.success) {
                    alert('video Uploaded Successfully')
                    props.history.push('/')
                } else {
                    alert('Failed to upload video')
                }
            })

    }


    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            

                <Form onSubmit={onSubmit}>
                <div style={{display:'flex', justifyContent:'space-between'}}>
                    <Dropzone
                    onDrop={onDrop}
                    multiple={false}
                    maxSize={10000000000}
                    >
                    {({getRootProps, getInputProps, }) => (
                        <div style={{width:'300px', height: '240px', display:'flex',border:'1px solid lightgray', alignItems:'center', justifyContent:'center'}} {...getRootProps()}>
                            <input {...getInputProps()} />
                            <Icon type="plus" style={{ fontSize:'3rem'}} />
                        </div>

                    )}
                    </Dropzone>
                  {/* thumnail */}
                  {Thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Thumbnail}`} alt="haha" />
                        </div>
                    }

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
                <Button onClick={onSubmit}>Submit</Button>

           
        </div>
    )
}

export default VideoUploadPage
