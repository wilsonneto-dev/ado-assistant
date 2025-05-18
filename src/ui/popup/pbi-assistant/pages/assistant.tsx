import { ButtonsWrapper, OkButton } from "../../shared/components/forms/buttons"
import { useState } from 'react'
import { Form, Label, Input } from "../../shared/components/forms/forms"

const Assistant = () => {
  const [title, setTitle] = useState("Test 1")
  const [description, setDescription] = useState("Test 2")
  const [criteria, setCriteria] = useState("Test 3")

  return <div>
    <Form>
      <Label>Title</Label>
      <Input value={title} onChange={setTitle} placeholder="Title" />
      <Label>Description</Label>
      <Input value={description} onChange={setDescription} placeholder="Description" />
      <Label>Criteria</Label>
      <Input value={criteria} onChange={setCriteria} placeholder="Criteria" />
    </Form>

    <ButtonsWrapper>
      <OkButton onClick={() => {
        chrome.tabs.query({active: true, currentWindow: true}).then((tabs: any) => {
          const tab = tabs[0];
          chrome.tabs.sendMessage(
            tab.id || 0, {
            type: "UPDATE_PBI",
            data: {
              title,
              description,
              criteria
            }
          })
          console.log("UPDATE_PBI", {
            title,
            description,
            criteria
          })
  
        })
      }} />
    </ButtonsWrapper>
  </div>
}

export default Assistant