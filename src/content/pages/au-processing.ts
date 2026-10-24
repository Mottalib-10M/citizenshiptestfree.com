import { definePage } from '../../lib/guide-types';

export default definePage({
  id: 'au-processing',
  group: 'au',
  order: 37,
  tool: { kind: 'mini:auproc' },
  related: ['au-residence', 'au-eligibility', 'au-test', 'au-cost'],
  sources: ['au_processing', 'au_pr', 'au_test'],
  en: {
    slug: 'australian-citizenship/processing-time',
    nav: 'Processing time',
    card: 'The current official times from application to decision and to ceremony, and where your file stands.',
    title: 'Citizenship Processing Time Australia: Official Times',
    description: 'Citizenship processing time in Australia: the current Home Affairs times from application to decision and to ceremony, for 25 % to 90 % of applications, dated.',
    h1: 'Citizenship processing time in Australia: the official figures, dated',
    intro: 'Enter the weeks since you applied: the tool compares them with the time in which nine applications in ten are decided.',
    resume: (h) => `Home Affairs publishes how long citizenship applications currently take, as the time within which 25 %, 50 %, 75 % and 90 % of applications are processed. On its page updated on ${h.date(h.P.au.processing.pageUpdated)}, for citizenship by conferral (general eligibility and other situations), 90 % of applications were decided within ${h.P.au.processing.table.decision.p90} of being lodged, and half within ${h.P.au.processing.table.decision.p50}. From approval to the ceremony, 90 % waited up to ${h.P.au.processing.table.approvalToCeremony.p90}. From application to ceremony, the whole journey, the figures were ${h.P.au.processing.table.applicationToCeremony.p50} for half of applicants and ${h.P.au.processing.table.applicationToCeremony.p90} for 90 %. These are past results, not a promise for a new application: the department says a file may take longer if it is incomplete, if information must be checked or if you delay attending your ceremony. The tool above tells you whether your wait is still inside the 90 % mark.`,
    faqs: (h) => [
      { q: 'Does the processing time include the citizenship test?', a: `The period from application to decision covers everything the department does before deciding, which for most applicants aged ${h.P.au.test.ages[0]} to ${h.P.au.test.ages[1]} includes the test appointment. Home Affairs says the wait for an appointment may vary. A failed test adds a new appointment, and after ${h.P.au.test.appointmentsBeforeRefusal} appointments without a pass the application may be refused.` },
      { q: 'Why do two Home Affairs pages give different times?', a: `When we checked, the page on becoming a citizen as a permanent resident still said 75 % of applications took 13 months and 90 % took 16 months from lodging to ceremony. The dedicated processing times page, updated ${h.date(h.P.au.processing.pageUpdated)}, gives much shorter times. We show the dedicated page, which is dated and updated regularly.` },
      { q: 'Can I travel while my application is processed?', a: 'Home Affairs asks you to let it know if you need to travel outside Australia while the application is being processed. It cannot approve your application while you are outside Australia, so a long trip at the wrong moment can delay the decision.' },
    ],
    body: (h) => {
      const T = h.P.au.processing.table;
      return `
<h2>The official times</h2>
${h.table(['Period', '25 %', '50 %', '75 %', '90 %'], [['Application to decision', T.decision.p25, T.decision.p50, T.decision.p75, T.decision.p90], ['Approval to ceremony', T.approvalToCeremony.p25, T.approvalToCeremony.p50, T.approvalToCeremony.p75, T.approvalToCeremony.p90], ['Application to ceremony', T.applicationToCeremony.p25, T.applicationToCeremony.p50, T.applicationToCeremony.p75, T.applicationToCeremony.p90]], `Home Affairs, citizenship processing times, citizenship by conferral, page updated ${h.date(h.P.au.processing.pageUpdated)}.`, ['l', 'r', 'r', 'r', 'r'])}
<p>On the same page, 90 % of applications for citizenship by descent were decided within ${T.descentDecision.p90}, and 90 % of applications for evidence of citizenship within ${T.evidenceDecision.p90}.</p>
<h2>How to read a percentile</h2>
<p>"90 % in ${T.decision.p90}" means that, among the applications decided recently, nine in ten had been lodged no more than ${T.decision.p90} earlier. It says nothing about your file in particular, and one application in ten took longer. If your wait has passed the 90 % mark, it does not mean something is wrong, but it is a reasonable moment to check ImmiAccount for a request for information.</p>
<h2>From approval to the pledge</h2>
<p>If the application is approved and you need to attend a ceremony, the invitation letter arrives about four weeks before it. Ceremonies are generally held within six months of approval, says the Our Common Bond booklet, and the figures above show 90 % within ${T.approvalToCeremony.p90}. Some people do not need to attend a ceremony: they become citizens on the day the application is approved. You can apply for an Australian passport only after the ceremony and the pledge.</p>
<h2>Before you lodge</h2>
<p>The clock starts when you lodge, so lodging on the first possible day saves time. The ${h.a('au-residence', 'residence calculator')} gives that day, the ${h.a('au-cost', 'cost page')} the fee, and the ${h.a('au-test', 'practice test')} prepares you for the appointment.</p>`;
    },
  },
});
