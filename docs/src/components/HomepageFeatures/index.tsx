import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Function as a Service',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Revelations is a Function as a Service platform, aimed to help developers to upload their datasets and use the in-build Build a Machine page to create their own APIs as fast as possible, in any language supported!
      </>
    ),
  },
  {
    title: 'Fully Documentated',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Revelations is a project that believes in good documentation. It uses Docusaurus, mantained by Meta and developed with React to provide rich documentation and a blog site mentioning the differences between each major version!
      </>
    ),
  },
  {
    title: 'Open Source to the Core',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Revelations follows the microservice logic of simple services that have one purpose and are all called through a Middleware. The internal communication between them happens in a Docker Swarm network and everything is open for the user.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
