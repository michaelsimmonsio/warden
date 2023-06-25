import { Notification } from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

export function SendNotification() {
    return (
      <>
        <Notification title="We notify you that">
          You are now obligated to give a star to Mantine project on GitHub
        </Notification>
  
        <Notification icon={<IconCheck size="1.2rem" />} title="We notify you that">
          You are now obligated to give a star to Mantine project on GitHub
        </Notification>
      </>
    );
  }