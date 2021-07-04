import { ComponentMeta, ComponentStory } from '@storybook/react'
import React from 'react'
import { LeftNavBrand } from './left-nav-brand'

export default {
  title: 'Atoms/Branding',
  component: LeftNavBrand,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LeftNavBrand>

const Story: ComponentStory<typeof LeftNavBrand> = (args) => <LeftNavBrand {...args} />

export const Default = Story.bind({})
