import { html } from 'lit';
import '../components/InputWebComponent'

export default {
  title: 'InputComponent',
  component: 'input-component', // Tag name of your web component
};

const Template = (args) => html`<input-component ...args></input-component>`;

export const Default = Template.bind({});
Default.args = {
  handleChange: () => {}
};