/* eslint-disable react-hooks/rules-of-hooks */
import { type DropdownMenuCheckboxItemProps } from '@radix-ui/react-dropdown-menu';
import type { Meta } from '@storybook/react';
import { useState } from 'react';

import { Button } from '../Button/index.ts';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuRoot,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './menu.tsx';

const meta = {
  title: 'Components / Dropdown Menu',
  parameters: { controls: { sort: 'requiredFirst' } },
} satisfies Meta;

export default meta;

export const Basic = {
  render: () => {
    return (
      <DropdownMenuRoot>
        <DropdownMenuTrigger>
          <Button variant="outline">Open</Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup label="My Account">
            <DropdownMenuItem icon="user-alt" shortcut="⇧⌘P">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem icon="credit-card" shortcut="⌘B">
              Billing
            </DropdownMenuItem>
            <DropdownMenuItem icon="cog" shortcut="⌘S">
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem icon="keyboard" shortcut="⌘K">
              Keyboard Shortcuts
            </DropdownMenuItem>
          </DropdownMenuGroup>

          <DropdownMenuGroup>
            <DropdownMenuItem icon="people-group">Team</DropdownMenuItem>
            <DropdownMenuItem icon="plus" shortcut="⌘T">
              New Team
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenuRoot>
    );
  },
};

export const Checkboxes = {
  render: () => <CheckboxesExample />,
};

const CheckboxesExample = () => {
  type Checked = DropdownMenuCheckboxItemProps['checked'];

  const [preventCloseOnSelect, setPreventCloseOnSelect] = useState(false);
  const [bookmarksChecked, setBookmarksChecked] = useState<Checked>(true);
  const [urlsChecked, setUrlsChecked] = useState<Checked>(false);
  const [person, setPerson] = useState('marc');

  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button startIcon={['fas', 'bars']} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem shortcut="⌘+T">New Tab</DropdownMenuItem>
          <DropdownMenuItem shortcut="⌘+N" as="a" href="#">
            New Window
          </DropdownMenuItem>
          <DropdownMenuItem shortcut="⇧+⌘+N" disabled>
            New Private Window
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>More Tools</DropdownMenuSubTrigger>

            <DropdownMenuSubContent>
              <DropdownMenuGroup>
                <DropdownMenuItem shortcut="⌘+S">Save Page As...</DropdownMenuItem>
                <DropdownMenuItem>Create Shortcut...</DropdownMenuItem>
                <DropdownMenuItem>Name Window...</DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuGroup>
                <DropdownMenuItem>Developer Tools</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuGroup preventCloseOnSelect={preventCloseOnSelect}>
          <DropdownMenuCheckboxItem checked={preventCloseOnSelect} onCheckedChange={setPreventCloseOnSelect}>
            Prevent Close on Select
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem shortcut="⌘+B" checked={bookmarksChecked} onCheckedChange={setBookmarksChecked}>
            Show Bookmarks
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem checked={urlsChecked} onCheckedChange={setUrlsChecked}>
            Show Full URLs
          </DropdownMenuCheckboxItem>
        </DropdownMenuGroup>

        <DropdownMenuRadioGroup
          label="People"
          value={person}
          onValueChange={setPerson}
          preventCloseOnSelect={preventCloseOnSelect}
        >
          <DropdownMenuRadioItem value="marc">Marc Mac</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="jane">Jane Doe</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};
