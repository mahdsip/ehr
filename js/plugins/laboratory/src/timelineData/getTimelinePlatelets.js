import moment from 'moment';
import LaboratoryService from '../services/LaboratoryService';

export default async function getTimelinePlatelets(startDate, endDate) {
    const laboratoryService = new LaboratoryService();

    const params = [
        {
            date: `ge${moment(startDate)
                .hour(0)
                .minute(0)
                .second(0)
                .utc()
                .toISOString()}`,
        },
        {
            date: `le${moment(endDate)
                .hour(23)
                .minute(59)
                .second(59)
                .utc()
                .toISOString()}`,
        },
        {
            code: 'http://loinc.org|32623-1',
        },
        {
            _sort: '-date',
            _count: 100000, // TODO: any way to unlimit in fhir?
            _elements: 'effectiveDateTime,component',
        },
    ];

    const labs = await laboratoryService.fetchData(params);

    const timelineData = [];

    labs.forEach(labsItem => {
        if (!labsItem.date || !labsItem.platelets) {
            return;
        }

        timelineData.push({
            date: labsItem.date,
            value: labsItem.platelets,
        });
    });

    return timelineData.map(data => {
        if (data.value.split) {
            data.value = parseInt(data.value.split(' ')[0], 10);
        }

        return data;
    });
}
