import { Button, Form, Icon, Input, message, Select, Typography } from 'antd'
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
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
    {value: 4, label: "Study"},
    {value: 5, label: "GrandChase"},
    {value: 6, label: "etc"},
]

function EditVideo(props) {

    const Video = props.location.state.Video
    console.log(CategoryOption[Video.category].label)
    
    const [VideoTitle, setVideoTitle] = useState(Video.title)
    const [Description, setDescription] = useState(Video.description)
    const [Private, setPrivate] = useState(Video.privacy)
    const [Category, setCategory] = useState(Video.category)

    const [FilePath, setFilePath] = useState("")
    const [Thumbnail, setThumbnail] = useState("")
    const [Duration, setDuration] = useState("")

    useEffect(() => {
    //     setPrivate(PrivateOption[Video.privacy].value)
    //    setCategory(CategoryOption[Video.category].value)
    }, [])

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
    
        // Axios.post('/api/video/uploadfiles', formData, config)
        //         .then(response => {
        //             if (response.data.success) {
    
        //                 let variable = {
        //                     url: response.data.url,
        //                     fileName: response.data.fileName
        //                 }
        //                 console.log(response.data)
        //                 setFilePath(response.data.url)
    
        //                 //gerenate thumbnail with this filepath ! 
    
        //                 Axios.post('/api/video/thumbnail', variable)
        //                     .then(response => {
        //                         if (response.data.success) {
        //                             setDuration(response.data.fileDuration)
        //                             setThumbnail(response.data.url)
        //                         } else {
        //                             alert('Failed to make the thumbnails');
        //                         }
        //                     })
    
    
        //             } else {
        //                 alert('failed to save the video in server')
        //             }
        //         })
    }

    const onEdit = (event) => {

        event.preventDefault();

        const variables = {
            videoId : Video._id,
            title: VideoTitle,
            description: Description,
            privacy: Private,
            category: Category
        }

        Axios.post('/api/video/editVideo', variables)
          .then(response => {
              if(response.data.success){
                console.log(response.data.video)
                alert('수정이 완료되었습니다')
                props.history.push('/');
              }else alert('editVideo 실패')
          })
            
    }


    return (
        <div style={{ maxWidth: '700px', margin:'2rem auto'}}>
            <div style={{ textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>Upload Video</Title>
            </div>
            

                <Form onSubmit={onEdit}>
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
                  {Video.thumbnail !== "" &&
                        <div>
                            <img src={`http://localhost:5000/${Video.thumbnail}`} alt="haha" />
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
                        placeholder={Video.title}
                    />
                    <Title level={4}>Description</Title>
                    <TextArea 
                        onChange={onDescriptionChange}
                        value={Description}
                        placeholder={Video.description}
                    
                    />
                    
                </div>
                <br/>
                <div>
                        <select onChange={onPrivateChange} value={Private}  >
                            {
                                PrivateOption.map((item, index) => (
                                    
                                        <option key={index} value={item.value} >{item.label}</option> 
                                
                                    
                                ))
                                
                            }
                        
                        </select> <br/><br/>
                        <select onChange={onCategoryChange} value={Category} >
                            {
                            CategoryOption.map((item, index)=> (
                                // CategoryOption[Video.category].label 에 selected항목 추가하는 대신 select옵션에 value값 주기
                               
                                 <option key={index} value={item.value} >{item.label}</option>
                                
                            ))
                            
                            
                            }
                         
                        </select> <br/><br/>
                </div>
                <Button onClick={onEdit}>Edit</Button>

           
        </div>
    )
}

export default EditVideo
