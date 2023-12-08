import { useSelector } from 'react-redux';
import { useRef } from 'react';
import axios from 'axios';
import SignatureCanvas from 'react-signature-canvas';
import React from 'react'
import { Button,Box } from '@mui/material';

function Signature() {
    const signatureRef = useRef(null);
    const myData = useSelector(state => state.user)
    console.log("UserEmail: ", myData)
    const handleSave = async () => {
        try {
            const signatureImage = signatureRef.current.toDataURL();
            const formData = new FormData();
            formData.append('signature', signatureImage);
            formData.append('email', myData.email)
            formData.append('name', myData.name)
            const response = await axios.post('http://127.0.0.1:8000/auth/signature/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
 
            alert('Document saved successfully');
        } catch (error) {
            console.error(error);
            alert('Error saving document.');
        }
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4,marginTop:"10px" }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap', maxWidth: 600, mx: 4,marginTop:"15px",marginBottom:"15px", border:"5px solid green",borderRadius:"10px" }}>
                <SignatureCanvas
                    ref={signatureRef}
                    className="signature-canvas"
                />
            </Box>
            <Button variant='contained' onClick={handleSave} type='submit' size='large' sx={{ backgroundColor:"#2a9961",":hover": { backgroundColor: "white", color:"black"} ,width: '100%', marginBottom: "20px" }}>Signature</Button>
        </Box>

    )
}

export default Signature
