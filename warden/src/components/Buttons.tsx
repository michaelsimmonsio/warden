import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, NumberInput } from "@mantine/core";

import { SendNotification } from "./Notification"
import { sendMessageToSocket } from "../App";
import "../App.css"

import firebase from 'firebase/app';
import 'firebase/auth';

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from "../App";



type Report = {
  id: number;
  username: string;
  reason: string;
  date: string;
};

type PunishmentButtonProps = {
  report: Report;
};

type DeleteButtonProps = {
  report: Report;
};

type RejectButtonProps = {
  report: Report;
};

export function SignInButton() {

  const handleSignin = () => {
  
    const provider = new GoogleAuthProvider();
    try {
      signInWithPopup(auth, provider);
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <Button variant="light" color="blue" onClick={handleSignin}>
      Sign In
    </Button>
  );
}


export function DemoSignIn() {

  const handleSignin = () => {

    const signInDemo = async () => {
      try {
        const email = "demo@demo.com"
        const password = "password"

        await signInWithEmailAndPassword(auth, email, password);

      } catch(error) {
        console.error("Error signing in with demo account " + error);
      }
    }

    signInDemo();



  }

  return (
    <Button variant="light" color="green" onClick={handleSignin}>
      Sign In (Demo Account)
    </Button>
  );
}


export function SignOutButton() {

  const handleSignout = () => {
    auth.signOut();
  }

  return (
    <Button variant="light" color="red" onClick={handleSignout}>
      Sign Out
    </Button>
  );
}




export function PunishmentButton({ report }: PunishmentButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const handlePunish = () => {
    const totalSeconds = days * 86400 + hours * 3600 + minutes * 60;
    console.log(`Punishing for ${totalSeconds} seconds`);
    // Handle the punishment here...
    SendNotification(); // doesn't work yet
    sendMessageToSocket({
      action: "newReport",
      username: report.username,
      reason: "aa"
    });
    


    close();
  };

function handlePlatform(platform: String) { 
    if (platform == "addlater") { }
    if (report.reason === "TestReason") {
      return(
        <div>
          <p>TestReason</p>
        </div>
      )
    }

 };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Punish User">
        
        <TextInput
          label="Player Username"
          value={report.username}
          readOnly
          my="sm"
        />
        <TextInput
          data-autofocus
          label="Punishment Reason"
          placeholder="Verbal Harassment"
          my="sm"
        />

        {handlePlatform(report.reason)}
        <Group grow>
          <NumberInput label="Days" value={days} onChange={(value: number | "") => setDays(value as number)} min={0} />
          <NumberInput label="Hours" value={hours} onChange={(value: number | "") => setHours(value as number)} min={0} max={24} />
          <NumberInput label="Minutes" value={minutes} onChange={(value: number | "") => setMinutes(value as number)} min={0} max={59} />
        </Group>
        <Button variant="light" color="red" my="sm" onClick={handlePunish}>
          Punish User
        </Button>
      </Modal>

      <Button border-right="5px" variant="light" color="red" onClick={open}>
        Punish User
      </Button>
    </>
  );
}

export function RejectButton ({ report }: RejectButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleReject = () => {
    SendNotification(); // doesn't work yet
    sendMessageToSocket({
      action: "rejectReport",
      id: report.id,
      username: report.username
    });

    window.location.reload();



    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Reject Report">
        <TextInput
          label="Player Username"
          value={report.username}
          readOnly
          my="sm"
        />
        <TextInput
          label="Report ID"
          value={report.id}
          readOnly
          my="sm"
        />
        <Button style={{ marginRight: '8px' }} variant="light" color="red" my="sm" onClick={handleReject}>
          Confirm Rejection
        </Button>
        <Button variant="light" color="green" my="sm" onClick={close}>
          Cancel Rejection
        </Button>
      </Modal>

      <Button border-right="5px" variant="light" color="green" onClick={open}>
        Reject Report
      </Button>
    </>
  );
}

export function DeleteButton({ report }: DeleteButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  const handleDelete = () => {
    SendNotification(); // doesn't work yet
    sendMessageToSocket({
      action: "deleteReport",
      id: report.id,
      username: report.username
    });

    window.location.reload();
    


    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title="Delete Report">
        <TextInput
          label="Player Username"
          value={report.username}
          readOnly
          my="sm"
        />
        <TextInput
          label="Report ID"
          value={report.id}
          readOnly
          my="sm"
        />
        <Button variant="light" style={{ marginRight: '8px' }} color="red" my="sm" onClick={handleDelete}>
          Confirm Deletion
        </Button>
        <Button variant="light" color="green" my="sm" onClick={close}>
          Cancel Deletion
        </Button>
      </Modal>

      <Button border-right="5px" variant="light" color="yellow" onClick={open}>
        Delete Report
      </Button>
    </>
  );
}

export function TestNotification() {

  return (
    <Button variant="light" color="blue" onClick={SendNotification}>Test Notifications</Button>
  );

}