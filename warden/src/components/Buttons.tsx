import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, NumberInput } from "@mantine/core";

import { SendNotification } from "./Notification"
import { sendMessageToSocket } from "../App";
import "../App.css"



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

export function RejectButton() {
  return (
    <Button variant="light" color="green">
      Reject Report
    </Button>
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
        <Button variant="light" color="red" my="sm" onClick={handleDelete}>
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