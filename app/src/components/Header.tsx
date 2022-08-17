import React             from "react";
import {Disclosure}      from '@headlessui/react';
import {MenuIcon, XIcon} from '@heroicons/react/outline';

interface Route {
  name: string,
  href: string,
  current: boolean
}

class Header extends React.Component {
  private routes: Route[] = [];

  private classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
  }

  constructor() {
    super({});
    this.routes = [
      {name: 'Homepage', href: '/', current: true},
      {name: 'Images', href: '/images', current: false}
    ]
  }

  render() {
    return (
      <Disclosure as={"nav"} className={"bg-emerald-800"}>
        {({open}) => (
          <>
            <div className={"max-w-7xl mx-auto px-2 sm:px-6 lg:px-8"}>
              <div className={"relative flex items-center justify-between h-16"}>
                <div className={"absolute inset-y-0 left-0 flex items-center sm:hidden"}>
                  <Disclosure.Button
                    className={"inline-flex items-center justify-center p-2 rounded-md text-emerald-400 " +
                      "hover:text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-inset " +
                      "focus:ring-white"}>
                    {open ? (
                      <XIcon className={"block h-6 w-6"} aria-hidden={"true"}/>
                    ) : (
                       <MenuIcon className={"block h-6 w-6"} aria-hidden={"true"}/>
                     )}
                  </Disclosure.Button>
                </div>
                <div className={"flex-1 flex items-center justify-center sm:items-strecth sm:justify-start"}>
                  <a className={"text-xl text-white pr-2 font-semibold no-underline"} href={"/"}>Revelations</a>
                </div>
                <div className={"hidden sm:block sm:ml-6"}>
                  <div className="flex space-x-4">
                    {this.routes.map((route: Route) => (
                      <a
                        key={route.name}
                        href={route.href}
                        className={this.classNames(
                          route.current ? 'bg-emerald-900 text-white' : 'text-emerald-300 ' +
                            'hover:bg-emerald-700 hover:text-white',
                          'px-3 py-2 rounded-md no-underline text-sm font-medium'
                        )}
                        aria-current={route.current ? 'page' : undefined}>
                        {route.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <Disclosure.Panel className={"sm:hidden"}>
              <div className={"px-2 pt-2 pb-3 space-y-1"}>
                {this.routes.map((route: Route) => (
                  <Disclosure.Button
                    key={route.name}
                    as="a"
                    href={route.href}
                    className={this.classNames(
                      route.current ? 'bg-emerald-900 text-white' : 'text-emerald-300 hover:bg-emerald-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={route.current ? 'page' : undefined}
                  >
                    {route.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    )
  }
}

export default Header;