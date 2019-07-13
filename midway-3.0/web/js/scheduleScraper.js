//let test = "\nRegular Schedule\nPeriod / Time\nP1: 7:47 - 8:30\nHomeroom 8:30 - 8:40 \nP2: 8:43 - 9:23\nP3: 9:26 - 10:06\nP4: 10:11 - 10:51\nP5: 10:54 - 11:34\nP6: 11:37 - 12:17\nP7: 12:20 - 1:00\nP8: 1:03 - 1:43\nP9: 1:46 - 2:26\n\n\n\nTwo Hour Delay Schedule**\nPeriod/Time\nP1: 9:47 - 10:14\nHomeroom 10:14 - 10:22\nP2: 10:25 - 10:52\nP3: 10:55 - 11:22\nP4: 11:25 - 11:53\nP5: 11:56 - 12:24\nP6: 12:27 - 12:55\nP7: 12:58 - 1:26\nP8: 1:29 - 1:57\nP9: 2:00 - 2:26\n\n\n\nEarly Dismissal\n\nPeriod/Time\n\nP1: 7:47 - 8:05\nHomeroom 8:05 - 8:10\nP2: 8:13 - 8:31\nP3: 8:34 - 8:51\nP4: 8:54 - 9:11\nP5: 9:14 -9:31\nP6: 9:34 - 9:51\nP7: 9:54 - 10:11\nP8: 10:14 - 10:31\nP9: 10:34 - 10:51\n\n2:26 - 2:55 Extra Help\n\n------------------\n\n Schedule Pilot 1 (Jan. 28 - Feb. 15)\nPeriod\nTime\n1	\n8:00 - 8:50\n2\n8:55 - 9:45\nHomeroom\n9:50 - 9:55\n3\n10:00 - 10:50\n4\n10:55 - 11:45\n(5) First Lunch\n(5) Class for First Lunch\n11:49 - 12:17\n12:21 - 1:11\n(5) Class for Second Lunch\n(5) Second Lunch\n11:49 - 12:39\n12:43 - 1:11\n6\n1:15 - 2:05\n7\n2:10 - 3:00\n  \n\n Schedule Pilot 2 (March 11 - 28)\nPeriod\nTime\n1	\n8:00 - 8:50\n2\n8:55 - 9:45\nCommon Tutorial (Mon, Wed, Fri)\nHomeroom (Tue & Thu)\n9:50 - 9:55\n3\n10:00 - 10:50\n4\n10:55 - 11:45\n(5) First Lunch\n(5) Class for First Lunch\n11:49 - 12:17\n12:21 - 1:11\n(5) Class for Second Lunch\n(5) Second Lunch\n11:49 - 12:39\n12:43 - 1:11\n6\n1:15 - 2:05\n7\n2:10 - 3:00\n \n\n Two-hour delay schedule during either pilot period\nPeriod\nTime\n1	\n10:00 - 10:33\n2	\n10:38 - 11:11\nHomeroom/Common Tutorial\n11:16 - 11:21\n3\n11:26 - 11:59\n(5) First Lunch\n(5) Class for First Lunch\n12:04 - 12:31\n12:35 - 1:08\n(5) Class for Second Lunch\n(5) Second Lunch\n12:04 - 12:37\n12:41 - 1:08\n4\n 1:12 - 1:45\n6\n1:49 - 2:22\n7\n2:27 - 3:00\n  N.B. Period 5 immediately follows period 3 in the delayed-opening schedule.\n\n \n\nDaily Schedule 2018-19\n\nDay\nFirst Bell\nFirst Period Begins\nSeventh Period Ends\nMonday\n7:55 a.m.\n8:00 a.m.\n2:55 p.m.\nTuesday\n7:55 a.m.\n8:00 a.m.\n3:05 p.m.\nWednesday\n7:55 a.m.\n8:00 a.m.\n2:55 p.m.\nThursday\n7:55 a.m.\n8:00 a.m.\n3:05 p.m.\nFriday\n7:55 a.m.\n8:00 a.m.\n2:55 p.m.\n \n\n \n\n \n\n \n\n \n\nClass Schedule\n\nPeriod\nMonday/Wednesday/Friday\nTuesday/Thursday\n1\n8:00 - 8:51\n8:00 - 8:51\n2\n8:56 - 9:47\n8:56 - 9:47\nHomeroom\nX\n9:52 - 9:57\n3\n9:52 - 10:43\n10:02 - 10:53\n4\n10:48 - 11:39\n10: 58 - 11:49\n(5) First Lunch\n(5) Class for First Lunch\n11:43 - 12:09\n12:13 - 1:04\n11:53 - 12:19\n12:23 -  1:14\n(5) Class for Second Lunch\n(5) Second Lunch\n11:43 - 12:34\n12:38 - 1:04\n11: 53 - 12:44\n12:48 - 1:14\n6\n1:08 - 1:59\n1:18 - 2:09\n7\n2:04 - 2:55\n2:14 - 3:05\n \n\n Delayed Opening\n\nIn the event that the opening of school is delayed, we will follow the schedule listed below:\n\nTwo-Hour Delay Schedule\n\n Period 1\n\n10:00 – 10:34\n\n \n\n Period 2\n\n10:39 – 11:13\n\n \n\n Period 3\n\n11:18 – 11:52\n\n \n\n Period 5\n\n1st Lunch 11:56 – 12:21\n\nClass 12:25 – 12:59\n\n \n\nClass 11:56 – 12:30\n\n2nd Lunch 12:34 – 12:59\n\n Period 4\n\n1:03 – 1:37\n\n \n\n Period 6\n\n1:42 – 2:16\n\n \n\n Period 7\n\n2:21 – 2:55\n\n \n\n N.B. Period 5 immediately follows period 3 in the delayed-opening schedule.";


function extractSchedules (str) {
	var schedules = [];
	str = str.split("#");
	
	for (var i = 0; i < str.length; i++) {
		// remove trailing and leading spaces
		let scheduleName = str[i].split("\n")[0].replace(/^\s+/,"").replace(/\s+$/,"");
		let scheduleExtract = extractPeriods(str[i].split("\n").slice(1).join("\n"));
		
		if (scheduleName) {
			schedules.push({
				scheduleName,
				scheduleExtract
			})
		}
		
	}
	return schedules;
}

function extractPeriods (str) {
	
	const extractTime = "(\\d{1,2}(?:\\W*:\\W*)\\d{2}(?:pm|am|p|a|))";
	const extractPeriodName = "([\\s\\S]+?)";
	
	// technically should be equal to eval("/"+extractPeriodName+extractTime+"(?:\\W+)"+extractTime+"/gi")
	// but the compiled regexp is used for efficiency
	const extractPeriodRegex = /([\s\S]+?)(\d{1,2}(?:\W*:\W*)\d{2}(?:pm|am|p|a|))(?:\W+)(\d{1,2}(?:\W*:\W*)\d{2}(?:pm|am|p|a|))/gi;
	
	let parsedPeriods = [];
	let currentPeriodMatch;
	
	function formatAbidingPeriodNames (str) {
		const selectPeriodName = /(?:period|p)(?:\W*)(\d+)([\s\S]*)$/i;
		
		let parsedPeriodName = str.match(selectPeriodName);
		if (parsedPeriodName) {
			return "Period " + parsedPeriodName[1] + parsedPeriodName[2];
		}
		else {
			return false;
		}
	}
	
	// at the moment this really just deletes trailing and leading whitespace
	function cleanNonStandardPeriodNames (str) {
		//const selectPeriodName = /(?:\s+)([\s\S]*?)(?:\s+)$/i;
		const selectPeriodNameMatch = str.replace(/^\s+/,"").replace(/\s+$/,"");
		
		//if (selectPeriodNameMatch && selectPeriodNameMatch[1]) {
			return selectPeriodNameMatch;
		//}
		//else {
			// fails to find actual words
		//	return "";
		//}
	}
	
	function cleanPeriodNames (str) {
		const selectDigits = /(?:[\s\S]*?)(\d+)/;
	
		let formattedPeriodName = formatAbidingPeriodNames(cleanNonStandardPeriodNames(str));
		let formattedNonStandardPeriodName = cleanNonStandardPeriodNames(str);
		let digitsMatch = formattedNonStandardPeriodName.match(selectDigits);
		if (formattedPeriodName) {
			// string has been properly formatted; we're done
			return formattedPeriodName;
		}
		//else if (selectDigits.test(formattedNonStandardPeriodName)) {
		//	return "Period " + digitsMatch[1];
		//}
		else {
			// string not formatted; must be of an unconventional format
			return formattedNonStandardPeriodName;
		}
	}
	
	while (currentPeriodMatch = extractPeriodRegex.exec(str)) {
		parsedPeriods.push({
			periodName:cleanPeriodNames(currentPeriodMatch[1]),
			periodTime:[currentPeriodMatch[2],currentPeriodMatch[3]]
		});
	}
	
	return parsedPeriods;
}

//extractPeriods(test);

///////archive of garbage
///(?:period|p|)((?:(?:[^\W\:]*)(?=[^\w\:]+))*)(\d+(?:\W*:\W*)\d+(?:pm|am|p|a|))(?:\W+)(\d+(?:\W*:\W*)\d+(?:pm|am|p|a|))/gi;
