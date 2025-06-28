// statusWorkflow.js


export const STATUS_WORKFLOW = {
    'Under Review': {
        seq: 0,
        checkbox: null,
        dropdown: null,
        groups: [],
        auto: true,
        description: 'Initial status when job is created'
    },
    'Financially Approved': {
        seq: 1,
        checkbox: 'financial-approval',
        dropdown: 'Financial Approval',
        groups: [5], // Sales
        auto: false,
        description: 'Financial approval from sales'
    },
    'Technically Approved': {
        seq: 2,
        checkbox: 'technical-approval',
        dropdown: 'Technical Approval',
        groups: [5], // Sales
        auto: false,
        description: 'Technical approval from sales'
    },
    'Working on Job-Study': {
        seq: 3,
        checkbox: null,
        dropdown: null,
        groups: [],
        auto: true,
        trigger: (job) => job.financial_approval && job.technical_approval,
        description: 'Auto-triggered when both approvals are checked'
    },
    'Working on softcopy': {
        seq: 4,
        checkbox: null,
        dropdown: null,
        groups: [],
        auto: true,
        trigger: (job) => job.working_on_softcopy,
        description: 'Auto-triggered when planning is saved'
    },
    'Need SC Approval': {
        seq: 5,
        checkbox: null,
        dropdown: null,
        groups: [],
        auto: true,
        trigger: (job) => job.sc_sent_to_sales,
        description: 'Auto-triggered when prepress first saves'
    },
    'SC Under QC Check': {
        seq: 6,
        checkbox: 'softcopy-approval',
        dropdown: 'SC Approved',
        groups: [5], // Sales
        auto: false,
        description: 'Sales approves softcopy for QC'
    },
    'SC Checked': {
        seq: 7,
        checkbox: 'qc-sc-checked',
        dropdown: 'SC Checked',
        groups: [3], // QC
        auto: false,
        description: 'QC confirms softcopy is checked'
    },
    'Working on Cromalin': {
        seq: 8,
        checkbox: 'aw-working-cromalin',
        dropdown: 'Ask Supplier for Cromalin',
        groups: [2], // Prepress
        auto: false,
        description: 'Prepress starts working on cromalin'
    },
    'Need Cromalin Approval': {
        seq: 9,
        checkbox: 'qc-cromalin-checked',
        dropdown: 'Cromalin Checked',
        groups: [3], // QC
        auto: false,
        description: 'QC confirms cromalin is checked'
    },
    'Working on Repro': {
        seq: 10,
        checkbox: 'aw-working-repro',
        dropdown: 'Ask Supplier for Repro',
        groups: [2], // Prepress
        auto: false,
        description: 'Prepress starts working on repro'
    },
    'Plates are Received': {
        seq: 11,
        checkbox: 'aw-plates-Received',
        dropdown: 'Plates Received',
        groups: [2], // Prepress
        auto: false,
        description: 'Prepress confirms plates received'
    },
    'QC Received Plates': {
        seq: 12,
        checkbox: 'qc-plates-received',
        dropdown: 'QC Received Plates',
        groups: [3], // QC
        auto: false,
        description: 'QC confirms plates received'
    },
    'Plates are Ready': {
        seq: 13,
        checkbox: 'qc-plates-checked',
        dropdown: 'QC Checked Plates',
        groups: [3], // QC
        auto: false,
        description: 'QC confirms plates are ready'
    }
};