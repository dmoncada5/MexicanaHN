import { CompanysService } from 'app/main/Configuracion/companys/companys.service';
import {ProjectDashboardServiceService} from '../main/sample/project-dashboard-service.service'

export class ProjectDashboardDb
{

  

    public static projects = [
        {
            'name': 'FF'
        }
        // ,
        // {
        //     'name': 'ACME Corp. Frontend App'
        // },
        // {
        //     'name': 'Creapond'
        // },
        // {
        //     'name': 'Withinpixels'
        // }
    ];

    public static widgets = {
        'widget1'      : {
            'ranges'      : {
                'H' : 'Hoy',
                'A' : 'Ayer',
                'W': '1 Semana'
            },
            'currentRange': 'H',
            'data'        : {
                'label': 'FACTURAS',
                'count': {
                    'H' : 11,
                    'A' : 25,
                    'W': 19
                },
                'extra': {
                    'label': 'Completed',
                    'count': {
                        'H' : 6,
                        'A' : 7,
                        'W': '-'
                    }

                }
            },
            'detail'      : 'Esta card muestra la cantidad de Facturas creadas segun seleccion puede ser Hoy, Ayer o una semana'
        },
        'widget2'      : {
            'title' : 'Promociones',
            'data'  : {
                'label': 'Total',
                'count': 4,
                'extra': {
                    'label': 'Yesterday\'s overdue',
                    'count': 2
                }
            },
            'detail': 'Esta card muestra la cantidad de promociones creadas en sistema'
        },
        'widget3'      : {
            'title' : 'Clientes',
            'data'  : {
                'label': 'Total',
                'count': 32,
                'extra': {
                    'label': 'Closed today',
                    'count': 0
                }
            },
            'detail': 'Esta card muestra la cantidad de clientes creados en sistema'
        },
        'widget4'      : {
            'title' : 'Proveedores',
            'data'  : {
                'label': 'Total',
                'count': 42,
                'extra': {
                    'label': 'Implemented',
                    'count': 8
                }
            },
            'detail': 'Esta card muestra la cantidad de proveedores creados en sistema'
        },
        'widget5'      : {
            'title'     : 'Top 5 productos',
            'ranges'    : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'mainChart' : {
                '2W': [
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 37
                            },
                            {
                                'name' : 'closed issues',
                                'value': 9
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 32
                            },
                            {
                                'name' : 'closed issues',
                                'value': 12
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 39
                            },
                            {
                                'name' : 'closed issues',
                                'value': 9
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 27
                            },
                            {
                                'name' : 'closed issues',
                                'value': 12
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 18
                            },
                            {
                                'name' : 'closed issues',
                                'value': 7
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 24
                            },
                            {
                                'name' : 'closed issues',
                                'value': 8
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 20
                            },
                            {
                                'name' : 'closed issues',
                                'value': 16
                            }
                        ]
                    }
                ],
                'LW': [
                    {
                        'name'  : 'Mon',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 37
                            },
                            {
                                'name' : 'closed issues',
                                'value': 12
                            }
                        ]
                    },
                    {
                        'name'  : 'Tue',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 24
                            },
                            {
                                'name' : 'closed issues',
                                'value': 8
                            }
                        ]
                    },
                    {
                        'name'  : 'Wed',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 51
                            },
                            {
                                'name' : 'closed issues',
                                'value': 7
                            }
                        ]
                    },
                    {
                        'name'  : 'Thu',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 31
                            },
                            {
                                'name' : 'closed issues',
                                'value': 13
                            }
                        ]
                    },
                    {
                        'name'  : 'Fri',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 29
                            },
                            {
                                'name' : 'closed issues',
                                'value': 7
                            }
                        ]
                    },
                    {
                        'name'  : 'Sat',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 17
                            },
                            {
                                'name' : 'closed issues',
                                'value': 6
                            }
                        ]
                    },
                    {
                        'name'  : 'Sun',
                        'series': [
                            {
                                'name' : 'issues',
                                'value': 31
                            },
                            {
                                'name' : 'closed issues',
                                'value': 10
                            }
                        ]
                    }
                ],
                'TW': [
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : '',
                                'value': 0
                            },
                            {
                                'name' : 'closed issues',
                                'value': 0
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : '',
                                'value': 0
                            },
                            {
                                'name' : 'closed issues',
                                'value': 0
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : '',
                                'value': 0
                            },
                            {
                                'name' : 'closed issues',
                                'value': 0
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : '',
                                'value': 0
                            },
                            {
                                'name' : 'closed issues',
                                'value': 0
                            }
                        ]
                    },
                    {
                        'name'  : '',
                        'series': [
                            {
                                'name' : '',
                                'value': 0
                            },
                            {
                                'name' : 'closed issues',
                                'value': 0
                            }
                        ]
                    // },
                    // {
                    //     'name'  : 'Sat',
                    //     'series': [
                    //         {
                    //             'name' : 'issues',
                    //             'value': 25
                    //         },
                    //         {
                    //             'name' : 'closed issues',
                    //             'value': 0
                    //         }
                    //     ]
                    // },
                    // {
                    //     'name'  : 'Sun',
                    //     'series': [
                    //         {
                    //             'name' : 'issues',
                    //             'value': 22
                    //         },
                    //         {
                    //             'name' : 'closed issues',
                    //             'value': 0
                    //         }
                    //     ]
                    }
                ]
            },
            'supporting': {
                'created'  : {
                    'label': '',
                    'count': {
                        '2W': 48,
                        'LW': 46,
                        'TW': ''
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : '',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'Created',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : '',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ]
                    }
                },
                'closed'   : {
                    'label': '',
                    'count': {
                        '2W': 27,
                        'LW': 31,
                        'TW': ''
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : '',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : '',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : '',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ]
                    }
                },
                'reOpened' : {
                    'label': '',
                    'count': {
                        '2W': 4,
                        'LW': 5,
                        'TW': ''
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'RE-OPENED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'RE-OPENED',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 1
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : '',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 2
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 1
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 4
                                    }
                                ]
                            }
                        ]
                    }
                },
                'wontFix'  : {
                    'label': '',
                    'count': {
                        '2W': 6,
                        'LW': 3,
                        'TW': ''
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'WON\'T FIX',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 2
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'WON\'T FIX',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'WON\'T FIX',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ]
                    }
                },
                'needsTest': {
                    'label': '',
                    'count': {
                        '2W': 10,
                        'LW': 7,
                        'TW': ''
                    },
                    'chart': {
                        '2W': [
                            {
                                'name'  : 'NEEDS TEST',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ],
                        'LW': [
                            {
                                'name'  : 'NEEDS TEST',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 8
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 1
                                    }
                                ]
                            }
                        ],
                        'TW': [
                            {
                                'name'  : 'NEEDS TEST',
                                'series': [
                                    {
                                        'name' : 'Mon',
                                        'value': 6
                                    },
                                    {
                                        'name' : 'Tue',
                                        'value': 3
                                    },
                                    {
                                        'name' : 'Wed',
                                        'value': 7
                                    },
                                    {
                                        'name' : 'Thu',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Fri',
                                        'value': 5
                                    },
                                    {
                                        'name' : 'Sat',
                                        'value': 4
                                    },
                                    {
                                        'name' : 'Sun',
                                        'value': 7
                                    }
                                ]
                            }
                        ]
                    }
                }
            }
        },
        'widget6'      : {
            'title'      : 'Task Distribution',
            'ranges'     : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'mainChart'  : {
                'TW': [
                    {
                        'name' : 'Frontend',
                        'value': 15
                    },
                    {
                        'name' : 'Backend',
                        'value': 20
                    },
                    {
                        'name' : 'API',
                        'value': 38
                    },
                    {
                        'name' : 'Issues',
                        'value': 27
                    }
                ],
                'LW': [
                    {
                        'name' : 'Frontend',
                        'value': 19
                    },
                    {
                        'name' : 'Backend',
                        'value': 16
                    },
                    {
                        'name' : 'API',
                        'value': 42
                    },
                    {
                        'name' : 'Issues',
                        'value': 23
                    }
                ],
                '2W': [
                    {
                        'name' : 'Frontend',
                        'value': 18
                    },
                    {
                        'name' : 'Backend',
                        'value': 17
                    },
                    {
                        'name' : 'API',
                        'value': 40
                    },
                    {
                        'name' : 'Issues',
                        'value': 25
                    }
                ]
            },
            'footerLeft' : {
                'title': 'Tasks Added',
                'count': {
                    '2W': 487,
                    'LW': 526,
                    'TW': 594
                }
            },
            'footerRight': {
                'title': 'Tasks Completed',
                'count': {
                    '2W': 193,
                    'LW': 260,
                    'TW': 287
                }
            }
        },
        'widget7'      : {
            'title'   : 'Schedule',
            'ranges'  : {
                'T' : 'Today',
                'TM': 'Tomorrow'
            },
            'schedule': {
                'T' : [
                    {
                        'title'   : 'Group Meeting',
                        'time'    : 'In 32 minutes',
                        'location': 'Room 1B'
                    },
                    {
                        'title': 'Coffee Break',
                        'time' : '10:30 AM'
                    },
                    {
                        'title': 'Public Beta Release',
                        'time' : '11:00 AM'
                    },
                    {
                        'title': 'Lunch',
                        'time' : '12:10 PM'
                    },
                    {
                        'title': 'Dinner with David',
                        'time' : '17:30 PM'
                    },
                    {
                        'title': 'Jane\'s Birthday Party',
                        'time' : '19:30 PM'
                    },
                    {
                        'title': 'Overseer\'s Retirement Party',
                        'time' : '21:30 PM'
                    }
                ],
                'TM': [
                    {
                        'title': 'Marketing Meeting',
                        'time' : '09:00 AM'
                    },
                    {
                        'title': 'Public Announcement',
                        'time' : '11:00 AM'
                    },
                    {
                        'title': 'Lunch',
                        'time' : '12:10 PM'
                    },
                    {
                        'title': 'Meeting with Beta Testers',
                        'time' : '15:00 AM'
                    },
                    {
                        'title': 'Live Stream',
                        'time' : '17:30 PM'
                    },
                    {
                        'title': 'Release Party',
                        'time' : '19:30 PM'
                    },
                    {
                        'title': 'CEO\'s Party',
                        'time' : '22:30 PM'
                    }
                ]
            }
        },
        'widget8'      : {
            'title'    : 'Budget Distribution',
            'mainChart': [
                {
                    'name' : 'Wireframing',
                    'value': 12
                },
                {
                    'name' : 'Design',
                    'value': 17
                },
                {
                    'name' : 'Coding',
                    'value': 28
                },
                {
                    'name' : 'Marketing',
                    'value': 25
                },
                {
                    'name' : 'Extra',
                    'value': 15
                }
            ]
        },
        'widget9'      : {
            'title'         : 'Spent',
            'ranges'        : {
                'TW': 'This Week',
                'LW': 'Last Week',
                '2W': '2 Weeks Ago'
            },
            'weeklySpent'   : {
                'title': 'WEEKLY SPENT',
                'count': {
                    '2W': '2,682.85',
                    'LW': '1,445.34',
                    'TW': '3,630.15'
                },
                'chart': {
                    '2W': [
                        {
                            'name'  : 'CREATED',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 6
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 1
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 3
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 2
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 4
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 6
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 2
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 2
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 1
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 3
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 2
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 6
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 5
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 3
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 6
                                }
                            ]
                        }
                    ]
                }
            },
            'totalSpent'    : {
                'title': 'TOTAL SPENT',
                'count': {
                    '2W': '29,682.85',
                    'LW': '31,128.19',
                    'TW': '34,758.34'
                },
                'chart': {
                    '2W': [
                        {
                            'name'  : 'CREATED',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 3
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 2
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 2
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 7
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 7
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 5
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 7
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 8
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 8
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 6
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 4
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 1
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 6
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 4
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 7
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 5
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 4
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 7
                                }
                            ]
                        }
                    ]
                }
            },
            'remaining'     : {
                'title': 'REMAINING',
                'count': {
                    '2W': '94.317,15',
                    'LW': '92.871,81',
                    'TW': '89.241,66'
                },
                'chart': {
                    '2W': [
                        {
                            'name'  : 'CREATED',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 1
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 4
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 5
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 7
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 8
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 2
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'LW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 3
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 2
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 1
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 4
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 8
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 8
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 4
                                }
                            ]
                        }
                    ],
                    'TW': [
                        {
                            'name'  : 'Created',
                            'series': [
                                {
                                    'name' : 'Mon',
                                    'value': 2
                                },
                                {
                                    'name' : 'Tue',
                                    'value': 4
                                },
                                {
                                    'name' : 'Wed',
                                    'value': 8
                                },
                                {
                                    'name' : 'Thu',
                                    'value': 6
                                },
                                {
                                    'name' : 'Fri',
                                    'value': 2
                                },
                                {
                                    'name' : 'Sat',
                                    'value': 5
                                },
                                {
                                    'name' : 'Sun',
                                    'value': 1
                                }
                            ]
                        }
                    ]
                }
            },
            'totalRemaining': {
                'title': 'TOTAL BUDGET',
                'count': '124.000,00'
            },
            'totalBudget'   : {
                'title': 'TOTAL BUDGET',
                'count': '124.000,00'
            }
        },
        'widget10'     : {
            'title': 'Budget Details',
            'table': {
                'columns': [
                 
             
                ],
                'rows'   : [
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],
                [],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],


                ]
            }
        },
        'widget11'     : {
            'title': 'Team Members',
            'table': {
                'columns': ['avatar', 'name', 'position', 'office', 'email', 'phone'],
                'rows'   : [
                    {
                        avatar  : 'assets/images/avatars/james.jpg',
                        name    : 'Jack Gilbert',
                        position: 'Design Manager',
                        office  : 'Johor Bahru',
                        email   : 'jgilbert48@mail.com',
                        phone   : '+16 298 032 7774'
                    },
                    {
                        avatar  : 'assets/images/avatars/katherine.jpg',
                        name    : 'Kathy Anderson',
                        position: 'Recruiting Manager',
                        office  : 'Solţānābād',
                        email   : 'kanderson49@mail.com.br',
                        phone   : '+23 572 311 1136'
                    },
                    {
                        avatar  : 'assets/images/avatars/andrew.jpg',
                        name    : 'Mark Turner',
                        position: 'Recruiting Manager',
                        office  : 'Neftegorsk',
                        email   : 'mturner4a@mail.com',
                        phone   : '+01 139 803 9263'
                    },
                    {
                        avatar  : 'assets/images/avatars/jane.jpg',
                        name    : 'Kathryn Martinez',
                        position: 'Director of Sales',
                        office  : 'Palekastro',
                        email   : 'kmartinez4b@mail.com',
                        phone   : '+25 467 022 5393'
                    },
                    {
                        avatar  : 'assets/images/avatars/alice.jpg',
                        name    : 'Annie Gonzales',
                        position: 'Actuary',
                        office  : 'Candon',
                        email   : 'agonzales4c@mail.edu',
                        phone   : '+99 891 619 7138'
                    },
                    {
                        avatar  : 'assets/images/avatars/vincent.jpg',
                        name    : 'Howard King',
                        position: 'Human Resources',
                        office  : 'Bergen op Zoom',
                        email   : 'hking4d@mail.gov',
                        phone   : '+46 984 348 1409'
                    },
                    {
                        avatar  : 'assets/images/avatars/joyce.jpg',
                        name    : 'Elizabeth Dixon',
                        position: 'Electrical Engineer',
                        office  : 'Písečná',
                        email   : 'edixon4e@mail.gov',
                        phone   : '+33 332 067 9063'
                    },
                    {
                        avatar  : 'assets/images/avatars/danielle.jpg',
                        name    : 'Dorothy Morris',
                        position: 'Office Assistant',
                        office  : 'Magsaysay',
                        email   : 'dmorris4f@mail.com',
                        phone   : '+05 490 958 6120'
                    },
                    {
                        avatar  : 'assets/images/avatars/carl.jpg',
                        name    : 'Mark Gonzales',
                        position: 'Quality Control',
                        office  : 'Matsue-shi',
                        email   : 'mgonzales4g@mail.com',
                        phone   : '+03 168 394 9935'
                    },
                    {
                        avatar  : 'assets/images/avatars/profile.jpg',
                        name    : 'Catherine Rogers',
                        position: 'Programmer Analyst',
                        office  : 'Kangar',
                        email   : 'crogers4h@mail.com',
                        phone   : '+86 235 407 5373'
                    },
                    {
                        avatar  : 'assets/images/avatars/garry.jpg',
                        name    : 'Ruth Grant',
                        position: 'Community Outreach',
                        office  : 'Beaune',
                        email   : 'rgrant4i@mail.pl',
                        phone   : '+36 288 083 8460'
                    },
                    {
                        avatar  : 'assets/images/avatars/james.jpg',
                        name    : 'Phyllis Gutierrez',
                        position: 'Administrative Assistant',
                        office  : 'Shlissel’burg',
                        email   : 'pgutierrez4j@mail.net',
                        phone   : '+52 749 861 9304'
                    }, {
                        avatar  : 'assets/images/avatars/alice.jpg',
                        name    : 'Lillian Morris',
                        position: 'Media Planner',
                        office  : 'Berlin',
                        email   : 'lmorris4k@mail.de',
                        phone   : '+59 695 110 3856'
                    }, {
                        avatar  : 'assets/images/avatars/vincent.jpg',
                        name    : 'Jeremy Anderson',
                        position: 'Systems Engineer',
                        office  : 'Lũng Hồ',
                        email   : 'janderson4l@mail.uk',
                        phone   : '+40 384 115 1448'
                    },
                    {
                        avatar  : 'assets/images/avatars/carl.jpg',
                        name    : 'Arthur Lawrence',
                        position: 'Nurse Practicioner',
                        office  : 'Sarkanjut',
                        email   : 'alawrence4m@mail.com',
                        phone   : '+36 631 599 7867'
                    }, {
                        avatar  : 'assets/images/avatars/andrew.jpg',
                        name    : 'David Simmons',
                        position: 'Social Worker',
                        office  : 'Ushumun',
                        email   : 'dsimmons4n@mail.com',
                        phone   : '+01 189 681 4417'
                    }, {
                        avatar  : 'assets/images/avatars/danielle.jpg',
                        name    : 'Daniel Johnston',
                        position: 'Help Desk',
                        office  : 'São Carlos',
                        email   : 'djohnston4o@mail.gov',
                        phone   : '+60 028 943 7919'
                    },

                    {
                        avatar  : 'assets/images/avatars/joyce.jpg',
                        name    : 'Ann King',
                        position: 'Internal Auditor',
                        office  : 'Liren',
                        email   : 'aking4p@mail.com',
                        phone   : '+91 103 932 6545'
                    },
                    {
                        avatar  : 'assets/images/avatars/james.jpg',
                        name    : 'Phillip Franklin',
                        position: 'VP Accounting',
                        office  : 'Soba',
                        email   : 'pfranklin4q@mail.com',
                        phone   : '+25 820 986 7626'
                    },
                    {
                        avatar  : 'assets/images/avatars/garry.jpg',
                        name    : 'Gary Gonzalez',
                        position: 'Speech Pathologist',
                        office  : 'Gangkou',
                        email   : 'ggonzalez4r@mail.cc',
                        phone   : '+10 862 046 7916'
                    }
                ]
            }
        },
        'weatherWidget': {
            'locations'      : {
                'sps': {
                    'name'           : 'San Pedro Sula',
                    'icon'           : 'icon-rainy2',
                    'temp'           : {
                        'C': '32',
                        'F': '82'
                    },
                    'windSpeed'      : {
                        'KMH': 12,
                        'MPH': 7.5
                    },
                    'windDirection'  : 'NW',
                    'rainProbability': '98%',
                    'next3Days'      : [
                        {
                            'name': 'Sunday',
                            'icon': 'icon-rainy',
                            'temp': {
                                'C': '21',
                                'F': '70'
                            }
                        },
                        {
                            'name': 'Sunday',
                            'icon': 'icon-cloudy',
                            'temp': {
                                'C': '19',
                                'F': '66'
                            }
                        },
                        {
                            'name': 'Tuesday',
                            'icon': 'icon-windy3',
                            'temp': {
                                'C': '24',
                                'F': '75'
                            }
                        }
                    ]
                }
            },
            'currentLocation': 'sps',
            'tempUnit'       : 'C',
            'speedUnit'      : 'KMH'
        }
    };
}
