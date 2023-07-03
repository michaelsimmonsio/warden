import { Notification } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';

export function SendNotification() {
  console.log("sending notification");
  return (
    <>
      <Notification withBorder radius="lg" title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>

      <Notification icon={<IconCheck size="1.2rem" />} withBorder radius="lg" title="We notify you that">
        You are now obligated to give a star to Mantine project on GitHub
      </Notification>
    </>
  );
}