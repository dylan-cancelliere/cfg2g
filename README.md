<div align="center">

# Career Fair Guide to Genocide

![TypeScript](https://badgen.net/badge/TypeScript/5.5.3/blue)
![Node.js](https://badgen.net/badge/Node.js/20.0.0/green)
![React](https://badgen.net/badge/React/18.3.1/cyan)
![TanStackRouter](https://badgen.net/badge/TanStackRouter/1.77/yellow)

</div>

Live site hosted at [sjprit.com](https://sjprit.com) !

## **System Prerequisites**

-   [Node.js](https://nodejs.org/en/)
-   [pnpm](https://pnpm.io/installation)
-   [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

<br/>

## **Local Setup**

1. Clone the repo and navigate to it

```bash
git clone git@github.com:dylan-cancelliere/cfg2g.git && cd cfg2g
```

2. Install dependencies

```bash
pnpm i --frozen-lockfile
```

3. Start the local dev server

```bash
pnpm start
```

4. (Optional) If you need to make changes to the backend code, get in contact with me in the SJP Discord @Dylan, an invite is linked on the site.

## **Code Style**

All code should conform to [Prettier](https://prettier.io/) style guidelines and the [ESLint](https://eslint.org/) specification in order to be considered for merge.

There is likely a plugins for each tool in your editor, but you can also run the following in the root directory in your terminal:

```bash
pnpm run pre-commit
```

## **Contributing**

Code should be made by forking the project and submitting a pull request. Also very interested in feature requests, so feel free to drop an issue here or make a thread in the #website-discussion Discord channel.

Contributing information on companies is currently limited to membership, however there is a feature planned to allow submission from the general public.

If you're a part of a different SJP or similar organization and are interested in getting a similar page tailored to your school, please reach out! We'd be thrilled to lend a hand, tech support or otherwise.

## **Data Sources**

All data provided by this site is exclusively the opinion of its individual author, supplemented by sources you may find linked. Any questions, concerns, or comments about the ratings should be left in the Discord.

## Roadmap

#### V2

-   ~~Data table cleanup~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/5 https://github.com/dylan-cancelliere/cfg2g/pull/7
-   ~~About page~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/9
-   ~~Info page~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/10
-   ~~RSS Feed of our socials posts~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/11
-   ~~Submission page logging~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/12
-   ~~Migrate Guide doc and format~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/13
-   ~~Finish the row click behavior started in https://github.com/dylan-cancelliere/cfg2g/pull/4~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/13

#### Remaining Feature List

-   Event view
    -   some sort of filter that we preconfigure to select all companies at a specific career fair or curated list
-   Tagging system
    -   Need a proposal of what more specifically this would do
    -   Could potentially be used to implement the event view feature
-   Space to advertise upcoming events
    -   Unsure if this is something people are actually asking for or if it would introduce safety concerns
    -   Mabye limit to recruiting events rather than mutual aid efforts?
-   Row click modal upgrades
    -   Integrations with Watermelon index, BDS, etc
    -   Per-company Changelog?
        -   Maybe overall would be easier?
-   Fancier landing page : )
-   Data visualizations
    -   Mostly need proposals for what data visualizations we'd like to see
-   ~~CFG data table improvements~~
    -   ~~Infinite scroll on CFG table~~
    -   ~~Fix table height~~
    -   https://github.com/dylan-cancelliere/cfg2g/pull/13
-   Submissions viewer
    -   Addition to discord bot to be able to manage queue of submissions
        -   options to mark submissions as accepted, important/todo, rejected, archived, reported (ban ip?), etc
-   Error boundary for CFG in case server is down
