'use client';

import React, { useState } from 'react';
import { PageContainer, SaveButton, InputContainer, Label, FileInput } from './styles';
import { TextField } from '@mui/material';

const Estabelecimento = () => {
  const [phone, setPhone] = useState('');
  const [delivery, setDelivery] = useState('');
  const [facebook, setFacebook] = useState('');
  const [instagram, setInstagram] = useState('');
  const [menu, setMenu] = useState<any>(null);

  const onSave = () => {
    console.log('Phone:', phone);
    console.log('Delivery link:', delivery);
    console.log('Facebook link:', facebook);
    console.log('Instagram link:', instagram);
    console.log('Menu PDF:', menu ? menu.name : 'No file selected');

    alert('Information saved!');
  };

  const handleMenuUpload = (event: any) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setMenu(file);
    } else {
      alert('Please upload a PDF file.');
    }
  };

  return (
    <PageContainer>
      <h1>Estabelecimento</h1>

      <InputContainer>
        <TextField label="WhatsApp" value={phone} onChange={(e) => setPhone(e.target.value)} variant="filled" />
      </InputContainer>

      <InputContainer>
        <TextField
          label="Delivery Link"
          type="url"
          value={delivery}
          onChange={(e) => setDelivery(e.target.value)}
          variant="filled"
        />
      </InputContainer>

      <InputContainer>
        <TextField
          label="Facebook Link"
          type="url"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          variant="filled"
        />
      </InputContainer>

      <InputContainer>
        <TextField
          label="Instagram Link"
          type="url"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          variant="filled"
        />
      </InputContainer>

      <InputContainer>
        <Label htmlFor="menu">Menu (PDF)</Label>
        <FileInput id="menu" type="file" accept="application/pdf" onChange={handleMenuUpload} />
      </InputContainer>

      <SaveButton onClick={onSave}>Salvar</SaveButton>
    </PageContainer>
  );
};

export default Estabelecimento;
