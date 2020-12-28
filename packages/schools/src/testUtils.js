import { shallow, mount, render } from 'enzyme';
export * from 'enzyme';

export const shallowWithProviders = node => shallow(node);
export const mountWithProviders = node => mount(node);
export const renderWithProviders = node => render(node);
