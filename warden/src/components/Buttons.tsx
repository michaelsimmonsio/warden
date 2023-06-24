import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group, TextInput, NumberInput } from "@mantine/core";

type Report = {
  id: number;
  username: string;
  reason: string;
  date: string;
};

type PunishmentButtonProps = {
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

      <Button variant="light" color="red" onClick={open}>
        Punish User
      </Button>
    </>
  );
}

export function RejectButton() {
  return (
    <Button variant="light" color="green">
      Reject
    </Button>
  );
}
