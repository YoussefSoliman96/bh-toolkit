import { Button, DropdownMenu, TextField } from "@radix-ui/themes";
import React from "react";

const NewProviderPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="First Name">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextField.Root placeholder="Last Name">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <div>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Button variant="soft">
              Title
              <DropdownMenu.TriggerIcon />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item>NP</DropdownMenu.Item>
            <DropdownMenu.Item>MD</DropdownMenu.Item>
            <DropdownMenu.Item>DNP</DropdownMenu.Item>
            <DropdownMenu.Item>DO</DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Gender
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item>Male</DropdownMenu.Item>
          <DropdownMenu.Item>Female</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <TextField.Root placeholder="Evaluation">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextField.Root placeholder="Follow Up">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextField.Root placeholder="Languages">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextField.Root placeholder="Age range">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <TextField.Root placeholder="Working hours">
        <TextField.Slot></TextField.Slot>
      </TextField.Root>
      <Button>Submit</Button>
    </div>
  );
};

export default NewProviderPage;
