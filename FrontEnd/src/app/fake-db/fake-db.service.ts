import { InMemoryDbService } from 'angular-in-memory-web-api';

import { ProjectDashboardDb } from 'app/fake-db/dashboard-project';
 import { AnalyticsDashboardDb } from 'app/fake-db/dashboard-analytics';
// import { CalendarFakeDb } from 'app/fake-db/calendar';
// import { ECommerceFakeDb } from 'app/fake-db/e-commerce';
// import { AcademyFakeDb } from 'app/fake-db/academy';
// import { MailFakeDb } from 'app/fake-db/mail';
// import { ChatFakeDb } from 'app/fake-db/chat';
// import { FileManagerFakeDb } from 'app/fake-db/file-manager';
// import { ContactsFakeDb } from 'app/fake-db/contacts';
// import { TodoFakeDb } from 'app/fake-db/todo';
// import { ScrumboardFakeDb } from 'app/fake-db/scrumboard';
// import { InvoiceFakeDb } from 'app/fake-db/invoice';
// import { ProfileFakeDb } from 'app/fake-db/profile';
// import { SearchFakeDb } from 'app/fake-db/search';
// import { FaqFakeDb } from 'app/fake-db/faq';
// import { KnowledgeBaseFakeDb } from 'app/fake-db/knowledge-base';
// import { IconsFakeDb } from 'app/fake-db/icons';
// import { ChatPanelFakeDb } from 'app/fake-db/chat-panel';
// import { QuickPanelFakeDb } from 'app/fake-db/quick-panel';
import {ProjectDashboardServiceService} from '../main/sample/project-dashboard-service.service'

export class FakeDbService implements InMemoryDbService
{

    createDb(): any
    {
        return {
            // Dashboards
            'project-dashboard-projects' : ProjectDashboardDb.projects,
            'project-dashboard-widgets'  : ProjectDashboardDb.widgets,
            'analytics-dashboard-widgets': AnalyticsDashboardDb.widgets,

          
        };
    }
}
